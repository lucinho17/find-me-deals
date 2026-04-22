import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());


const readUsers = async () => {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};


const writeUsers = async (users) => {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};


const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters long." });
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Invalid email address." });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }
    next();
};

app.post('/register', validateRegistration, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const users = await readUsers();
        
        // Check if user already exists
        if (users.find(u => u.username === username || u.email === email)) {
            return res.status(400).json({ error: "Username or email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, email, password: hashedPassword };
        
        users.push(newUser);
        await writeUsers(users);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving user data." });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const users = await readUsers();
        const user = users.find(u => u.username === username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.json({ message: "Login successful!", user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Error during login." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
