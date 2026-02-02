import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();

let prismaInstance = null;

function getPrisma() {
    if (!prismaInstance) {
        // Fallback to ensure it doesn't crash if env is missing (for debug purposes)
        const url = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
        prismaInstance = new PrismaClient({
            datasources: {
                db: {
                    url: url,
                },
            },
        });
    }
    return prismaInstance;
}

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// DEBUG: Connection Test
app.get('/api/debug-db', async (req, res) => {
    try {
        const dbUrl = process.env.DATABASE_URL;
        const isSet = !!dbUrl;
        const masked = isSet ? `${dbUrl.substring(0, 15)}...` : 'NOT SET';

        // List keys to verify if ANY env vars are loaded (security safe, only keys)
        const envKeys = Object.keys(process.env).filter(k => !k.includes('KEY') && !k.includes('SECRET'));

        if (!isSet) {
            return res.json({
                status: 'missing_env',
                message: 'DATABASE_URL is not set in Vercel Environment Variables',
                envVarSet: false,
                envKeysAvailable: envKeys
            });
        }

        // Try to connect
        const prisma = getPrisma();
        await prisma.$connect();
        const count = await prisma.allowedEmail.count();

        res.json({
            status: 'connected',
            envVarSet: isSet,
            maskedUrl: masked,
            envKeysAvailable: envKeys,
            recordCount: count
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            stack: error.stack,
            envVarSet: !!process.env.DATABASE_URL
        });
    }
});

// Admin: Get all allowed emails
app.get('/api/admin/emails', async (req, res) => {
    try {
        const emails = await getPrisma().allowedEmail.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
});

// Admin: Get all generated certificates
app.get('/api/admin/certificates', async (req, res) => {
    try {
        const certs = await getPrisma().certificate.findMany({ orderBy: { issuedAt: 'desc' } });
        res.json(certs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
});

// Admin: Revoke certificate
app.patch('/api/admin/certificates/:id/revoke', async (req, res) => {
    const { id } = req.params;
    try {
        const cert = await getPrisma().certificate.update({
            where: { id },
            data: { revoked: true }
        });
        res.json(cert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to revoke certificate' });
    }
});

// Admin: Delete certificate (and reset email lock)
app.delete('/api/admin/certificates/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Get cert to find email
        const cert = await getPrisma().certificate.findUnique({ where: { id } });
        if (!cert) return res.status(404).json({ error: 'Certificate not found' });

        // 2. Transaction: Delete Cert + Reset Email Lock (if email validation exists)
        await getPrisma().$transaction([
            getPrisma().certificate.delete({ where: { id } }),
            getPrisma().allowedEmail.updateMany({
                where: { email: cert.email },
                data: { isUsed: false }
            })
        ]);

        res.json({ message: 'Certificate deleted and email reset' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete certificate' });
    }
});

// Admin: Add allowed email

// Admin: Add allowed email
app.post('/api/admin/emails', async (req, res) => {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    try {
        const newEmail = await getPrisma().allowedEmail.create({
            data: {
                email,
                name: name || null
            }
        });
        res.json(newEmail);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to add email' });
    }
});

// Admin: Bulk add allowed emails
app.post('/api/admin/emails/bulk', async (req, res) => {
    const { emails } = req.body;
    if (!emails || !Array.isArray(emails)) return res.status(400).json({ error: 'Invalid data format' });

    try {
        const result = await getPrisma().$transaction(
            emails.map(e =>
                getPrisma().allowedEmail.upsert({
                    where: { email: e.email },
                    update: {}, // Do nothing if exists
                    create: {
                        email: e.email,
                        name: e.name || null
                    }
                })
            )
        );
        res.json({ count: result.length, message: `Successfully processed ${result.length} emails` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to bulk add emails' });
    }
});

// Admin: Delete allowed email
app.delete('/api/admin/emails/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await getPrisma().allowedEmail.delete({ where: { id } });
        res.json({ message: 'Email deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete email' });
    }
});

// User: Verify if email is allowed to generate certificate
app.post('/api/verify-email', async (req, res) => {
    const { email } = req.body;
    try {
        const allowed = await getPrisma().allowedEmail.findUnique({ where: { email } });
        if (!allowed) {
            return res.status(403).json({ allowed: false, error: 'Email not authorized' });
        }

        // If already used, fetch existing certificate
        if (allowed.isUsed) {
            const existingCert = await getPrisma().certificate.findFirst({ where: { email } });
            return res.json({ allowed: true, isUsed: true, certificate: existingCert });
        }

        // Return allowed along with the pre-set name if available
        res.json({ allowed: true, isUsed: false, name: allowed.name });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// User: Generate Certificate
app.post('/api/generate-certificate', async (req, res) => {
    const { email, name, templateId } = req.body;

    // Simple validation
    if (!email || !name) return res.status(400).json({ error: 'Missing fields' });

    try {
        // Double check eligibility
        const allowed = await getPrisma().allowedEmail.findUnique({ where: { email } });

        // STRICT CHECK: If already used, BLOCK creation/update.
        if (!allowed) {
            return res.status(403).json({ error: 'Email not authorized' });
        }
        if (allowed.isUsed) {
            return res.status(403).json({ error: 'Certificate already generated. Cannot regenerate.' });
        }

        const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();

        // Transaction: Create Cert + Mark Email Used
        const cert = await getPrisma().$transaction(async (tx) => {
            // Re-check status INSIDE transaction to prevent race conditions
            const currentAllowed = await tx.allowedEmail.findUnique({ where: { email } });
            if (!currentAllowed) throw new Error('Email not authorized');
            if (currentAllowed.isUsed) {
                // Check if a certificate actually exists (double verification)
                const existing = await tx.certificate.findFirst({ where: { email } });
                if (existing) {
                    throw new Error('Certificate already generated. Cannot regenerate.');
                }
            }

            const certificate = await tx.certificate.create({
                data: {
                    uniqueId,
                    email,
                    name,
                    templateId: templateId || 'default',
                }
            });

            await tx.allowedEmail.update({
                where: { email },
                data: { isUsed: true }
            });

            return certificate;
        });

        res.json({ success: true, certificate: cert });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Generation failed' });
    }
});

// Public: Get Certificate by ID (for verification)
app.get('/api/verify/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;
    try {
        const cert = await getPrisma().certificate.findUnique({ where: { uniqueId } });
        if (!cert) return res.status(404).json({ valid: false });
        res.json({ valid: true, certificate: cert });
    } catch (error) {
        res.status(500).json({ error: 'Verification error' });
    }
});

// Admin: Bulk Issue Certificates (Ensure DB records exist for all allowed emails)
app.post('/api/admin/certificates/bulk-issue', async (req, res) => {
    try {
        // 1. Get all allowed emails
        const allowedEmails = await getPrisma().allowedEmail.findMany();

        const results = [];

        // Using standard loop with sequential awaits to avoid transaction deadlocks or race conditions in sqlite
        for (const record of allowedEmails) {
            try {
                let cert = null;

                // Check if certificate already exists
                if (record.isUsed) {
                    cert = await getPrisma().certificate.findFirst({ where: { email: record.email } });
                }

                // If not exists (or record says used but cert missing), create it
                if (!cert) {
                    const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();
                    const name = record.name || 'Participant';

                    // Transaction to ensure atomicity for each record
                    cert = await getPrisma().$transaction(async (tx) => {
                        const newCert = await tx.certificate.create({
                            data: {
                                uniqueId,
                                email: record.email,
                                name: name,
                                templateId: 'default',
                            }
                        });

                        await tx.allowedEmail.update({
                            where: { id: record.id },
                            data: { isUsed: true }
                        });
                        return newCert;
                    });
                }

                if (cert) results.push(cert);
            } catch (innerErr) {
                console.error(`Failed to issue/fetch cert for ${record.email}`, innerErr);
                // Continue to next
            }
        }

        res.json(results);
    } catch (error) {
        console.error('Bulk issue failed:', error);
        res.status(500).json({ error: 'Failed to bulk issue certificates' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
