
import fetch from 'node-fetch';

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

const upload = async () => {
    for (const student of students) {
        try {
            const res = await fetch('https://www.kaizenstat.com/api/admin/emails', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-admin-password': 'QuantyX@MyAlu.C0m'
                },
                body: JSON.stringify({ 
                    email: student.email, 
                    name: student.name, 
                    category: "Tech Blog" 
                })
            });
            const data = await res.json().catch(() => ({}));
            console.log(`${student.email}: ${res.status} - ${JSON.stringify(data)}`);
        } catch (err) {
            console.error(`${student.email}: Error - ${err.message}`);
        }
    }
};

upload();
