
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const students = [
    { name: "Archana Nichani", email: "aarchananichani12@gmail.com" },
    { name: "Kethavath Ajay", email: "kethavathajay1434@gmail.com" },
    { name: "Mohammad Ahmad", email: "mahmad091323@gmail.com" },
    { name: "Sadha Sri", email: "sadhansidurai@gmail.com" },
    { name: "Khushi Jain", email: "jainkhushi28138@gmail.com" },
    { name: "Adithya Unni", email: "adithyaunni1204@gmail.com" },
    { name: "Saptarshi Goswami", email: "saptarshigoswami1@gmail.com" },
    { name: "Divya Mangesh Jakhal", email: "divyajakhal657@gmail.com" },
    { name: "Bhupendra Verma", email: "bvermaji2109@gmail.com" },
    { name: "Akshit Jain", email: "akshitj3214@gmail.com" },
    { name: "Akanksha Sharma", email: "as963111@gmail.com" },
    { name: "Sri Lakshmi Davuluri", email: "srilakshmiganeswarammadavuluri@gmail.com" },
    { name: "Sriranjani Karthikeyan", email: "sriranjanik007@gmail.com" },
    { name: "Om Watane", email: "omwatane17@gmail.com" },
    { name: "Kaushiki Singhai", email: "kaushikisinghai27@gmail.com" },
    { name: "Ashish Kumar", email: "kumarashish70800@gmail.com" },
    { name: "Razia Shaik", email: "raziashaik144@gmail.com" },
    { name: "Rashel Shah", email: "rashelshah11@gmail.com" },
    { name: "Ritik Kesharwani", email: "swagboycr29@gmail.com" },
    { name: "Sakshi Jadhav", email: "sakshijadhav8283@gmail.com" },
    { name: "Sumedh Hemant Pednekar", email: "sumedh.p710@gmail.com" },
    { name: "Mohammed Salman N", email: "salmanbinnazer06@gmail.com" },
    { name: "Arya Kumari", email: "aryakumari02792@gmail.com" },
    { name: "Rishi Raj", email: "rish.bt24cs70@opju.ac.in" },
    { name: "Shiwangi Kumari", email: "shiw.bt24cs86@opju.ac.in" },
    { name: "Sachin VP", email: "sachinvp0506@gmail.com" },
    { name: "Kunuguntla Harshitha", email: "kunuguntlaharshitha@gmail.com" },
    { name: "Amrita Roy", email: "donaroy581@gmail.com" },
    { name: "Akshay malakar", email: "akshaymalakar93411@gmail.com" }
];

async function seed() {
    console.log('Seeding Supabase with Tech Bloggers...');
    
    const dataToInsert = students.map(s => ({
        email: s.email,
        name: s.name,
        category: "Tech Blog",
        is_used: false
    }));

    const { data, error } = await supabase
        .from('allowed_emails')
        .upsert(dataToInsert, { onConflict: 'email,category' });

    if (error) {
        console.error('Error seeding data:', error);
        if (error.message.includes('relation "allowed_emails" does not exist')) {
            console.log('\nIMPORTANT: You must run the SQL in supabase/schema.sql in your Supabase SQL Editor first!');
        }
    } else {
        console.log('Successfully seeded Tech Bloggers into Supabase!');
    }
}

seed();
