const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Middleware per autenticare il token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route per autenticare e generare il token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Qui dovresti verificare le credenziali dell'utente
    if (username === 'admin' && password === 'password') {
        // Creare un token senza scadenza
        const token = jwt.sign({ username }, process.env.SECRET_KEY);
        return res.json({ token });
    }
    res.status(401).send('Credenziali non valide');
});


// Utilizza il middleware di autenticazione per le route protette
app.use('/data', authenticateToken, require('./routes/data'));

// Route protetta di esempio
app.get('/protected', authenticateToken, (req, res) => {
    res.send('Questa è una route protetta');
});

module.exports = app;
