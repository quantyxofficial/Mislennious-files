
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const emails = await prisma.allowedEmail.findMany();
    const certs = await prisma.certificate.findMany();

    const uniqueProfiles = [...new Set(emails.map(e => e.profile))];
    const uniqueCategories = [...new Set(emails.map(e => e.category))];
    const uniquePositions = [...new Set(emails.map(e => e.position))];

    const certProfiles = [...new Set(certs.map(c => c.profile))];

    console.log('--- UNIQUE PROFILES (EMAILS) ---');
    console.log(uniqueProfiles);

    console.log('--- UNIQUE CATEGORIES (EMAILS) ---');
    console.log(uniqueCategories);

    console.log('--- UNIQUE POSITIONS (EMAILS) ---');
    console.log(uniquePositions);

    console.log('--- UNIQUE PROFILES (CERTS) ---');
    console.log(certProfiles);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
