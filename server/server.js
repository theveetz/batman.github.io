const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// User model
const userModel = {
    findOne: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    create: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    userModel.create(newUser, (err, result) => {
        if (err) {
            return res.status(400).json({ error: 'User registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.findOne(username, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Serve frontend files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
