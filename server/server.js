const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const usersFilePath = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Helper functions to read and write users data
const readUsers = () => {
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersData);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Serve frontend files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
