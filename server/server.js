import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fmsd';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Username or email already exists." });
        }
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.json({ 
            message: "Login successful!", 
            user: { 
                username: user.username, 
                email: user.email,
                favorites: user.favorites 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: "Error during login." });
    }
});

// Favorites route
app.post('/favorites', async (req, res) => {
    const { username, game } = req.body;
    if (!username || !game) {
        return res.status(400).json({ error: "Username and game data are required." });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if game is already in favorites
        // The game structure might vary depending on the API used in App.jsx
        const gameId = game.gameID || game.id || game.title;
        const isFavorite = user.favorites.some(f => (f.gameID || f.id || f.title) === gameId);

        if (isFavorite) {
            // Remove from favorites
            user.favorites = user.favorites.filter(f => (f.gameID || f.id || f.title) !== gameId);
        } else {
            // Add to favorites
            user.favorites.push(game);
        }

        await user.save();
        res.json({ message: "Favorites updated!", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Error updating favorites." });
    }
});

app.get('/favorites/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Error fetching favorites." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
