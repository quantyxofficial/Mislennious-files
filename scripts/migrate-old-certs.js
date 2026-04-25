
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const { Client } = pg;

async function migrate() {
    const oldDbClient = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    );

    try {
        await oldDbClient.connect();
        console.log('Connected to old database.');

        // 1. Fetch old certificates
        console.log('Fetching old certificates...');
        const certsRes = await oldDbClient.query('SELECT * FROM "Certificate"');
        const oldCerts = certsRes.rows;
        console.log(`Found ${oldCerts.length} certificates.`);

        if (oldCerts.length > 0) {
            console.log('Migrating certificates one by one to avoid socket issues...');
            for (let i = 0; i < oldCerts.length; i++) {
                const c = oldCerts[i];
                const { error: certError } = await supabase
                    .from('certificates')
                    .upsert({
                        unique_id: c.uniqueId,
                        email: c.email,
                        name: c.name,
                        position: c.position,
                        category: c.category,
                        issued_at: c.issuedAt,
                        revoked: c.revoked || false,
                        template_id: c.templateId || 'default'
                    }, { onConflict: 'unique_id' });

                if (certError) {
                    console.error(`Error migrating certificate ${c.uniqueId}:`, certError.message);
                } else {
                    process.stdout.write('.');
                }
            }
            console.log('\nFinished certificate migration.');

            // 2. Mark corresponding emails as used
            console.log('Updating email usage status...');
            const emailsToUpdate = [...new Set(oldCerts.map(c => c.email))];
            for (const email of emailsToUpdate) {
                await supabase
                    .from('allowed_emails')
                    .update({ is_used: true })
                    .eq('email', email);
            }
            console.log('Successfully updated email status.');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await oldDbClient.end();
    }
}

migrate();
