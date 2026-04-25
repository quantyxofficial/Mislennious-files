import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        mode: 'Supabase Direct'
    });
});

// Admin: Login verify (Fallback if needed, though frontend handles its own password check now)
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.APP_ADMIN_PASSWORD || 'QuantyX@MyAlu.C0m';

    if (password === correctPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
