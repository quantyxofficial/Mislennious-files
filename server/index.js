import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

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
    const dbUrl = process.env.DATABASE_URL || '';
    const dbHost = dbUrl.split('@')[1]?.split(':')[0] || 'not connected';
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        database: dbHost,
        envLoaded: !!process.env.DATABASE_URL
    });
});



// Helper to check admin password
const checkAdminAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    // CRITICAL FIX: Fallback to the actual password if Env Var fails
    const correctPassword = process.env.APP_ADMIN_PASSWORD || 'QuantyX@MyAlu.C0m';

    if (password === correctPassword) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
    }
};

// Admin: Login verify
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    // CRITICAL FIX: Fallback to the actual password if Env Var fails
    const correctPassword = process.env.APP_ADMIN_PASSWORD || 'QuantyX@MyAlu.C0m';

    if (password === correctPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

// Admin: Get all allowed emails
app.get('/api/admin/emails', checkAdminAuth, async (req, res) => {
    try {
        const emails = await getPrisma().allowedEmail.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
});

// Admin: Get all generated certificates
app.get('/api/admin/certificates', checkAdminAuth, async (req, res) => {
    try {
        const certs = await getPrisma().certificate.findMany({ orderBy: { issuedAt: 'desc' } });
        res.json(certs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
});

// Admin: Revoke certificate
app.patch('/api/admin/certificates/:id/revoke', checkAdminAuth, async (req, res) => {
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
app.delete('/api/admin/certificates/:id', checkAdminAuth, async (req, res) => {
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
app.post('/api/admin/emails', checkAdminAuth, async (req, res) => {
    const { email, name, position, category } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    try {
        const newEmail = await getPrisma().allowedEmail.create({
            data: {
                email,
                name: name || null,
                position: position || null,
                category: category || null
            }
        });
        res.json(newEmail);
    } catch (error) {
        console.error('Error adding email:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to add email' });
    }
});

// Admin: Bulk add allowed emails
app.post('/api/admin/emails/bulk', checkAdminAuth, async (req, res) => {
    const { emails } = req.body;
    if (!emails || !Array.isArray(emails)) return res.status(400).json({ error: 'Invalid data format' });

    try {
        const result = await getPrisma().$transaction(
            emails.map(e =>
                getPrisma().allowedEmail.upsert({
                    create: {
                        email: e.email,
                        name: e.name || null,
                        position: e.position || null,
                        category: e.category || null
                    },
                    where: {
                        email_category: { // Use composite unique key for upsert
                            email: e.email,
                            category: e.category || null
                        }
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
app.delete('/api/admin/emails/:id', checkAdminAuth, async (req, res) => {
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
    const { email, templateId } = req.body;
    try {
        // Find ALL allowed entries for this email
        const allowedEntries = await getPrisma().allowedEmail.findMany({
            where: { email },
            orderBy: { createdAt: 'desc' }
        });

        if (allowedEntries.length === 0) {
            return res.status(403).json({ allowed: false, error: 'Email not authorized' });
        }

        // Check if this SPECIFIC certificate has already been generated
        const existingCert = await getPrisma().certificate.findFirst({
            where: { 
                email,
                templateId: templateId || 'default'
            },
            orderBy: { issuedAt: 'desc' }
        });

        if (existingCert) {
            return res.json({ allowed: true, isUsed: true, certificate: existingCert });
        }

        // Check if ANY entry is available (not strictly enforced by isUsed if we want multiple certs, 
        // but we'll use it as a general "authorized" flag)
        const isAuthorized = allowedEntries.length > 0;

        return res.json({ 
            allowed: isAuthorized, 
            isUsed: false,
            name: allowedEntries[0].name,
            position: allowedEntries[0].position,
            category: allowedEntries[0].category
        });

    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// User: Generate Certificate
app.post('/api/generate-certificate', async (req, res) => {
    const { email, name, templateId } = req.body;
    const targetTemplateId = templateId || 'default';

    // Simple validation
    if (!email || !name) return res.status(400).json({ error: 'Missing fields' });

    try {
        // 1. Check if authorized
        const allowed = await getPrisma().allowedEmail.findFirst({
            where: { email }
        });

        if (!allowed) {
            return res.status(403).json({ error: 'Email not authorized' });
        }

        // 2. Check if this specific certificate already exists
        const existing = await getPrisma().certificate.findFirst({
            where: { email, templateId: targetTemplateId }
        });

        if (existing) {
            return res.status(403).json({ error: 'Certificate already generated for this type.' });
        }

        const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();

        // Transaction: Create Cert + Mark Email Entry Used (if not already)
        const cert = await getPrisma().$transaction(async (tx) => {
            const certificate = await tx.certificate.create({
                data: {
                    uniqueId,
                    email,
                    name,
                    position: allowed.position,
                    category: allowed.category,
                    templateId: targetTemplateId,
                }
            });

            // Mark as used if it was the first time
            if (!allowed.isUsed) {
                await tx.allowedEmail.update({
                    where: { id: allowed.id },
                    data: { isUsed: true }
                });
            }

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
app.post('/api/admin/certificates/bulk-issue', checkAdminAuth, async (req, res) => {
    try {
        const { category } = req.body;
        // 1. Get allowed emails (filtered by category if provided)
        let where = {};
        if (category) {
            if (category === 'Tech Blog') {
                // Tech Blog includes explicit 'Tech Blog' AND legacy nulls
                where = {
                    OR: [
                        { category: 'Tech Blog' },
                        { category: null }
                    ]
                };
            } else {
                where = { category };
            }
        }

        const allowedEmails = await getPrisma().allowedEmail.findMany({ where });

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
                                position: record.position,
                                category: record.category,
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
