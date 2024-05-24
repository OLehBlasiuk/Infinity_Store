const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');
const path = require('path');

// Set the views directory and view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/html', express.static(path.join(__dirname, '../html')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'net start mysql', // Змініть на ваш хост, якщо база даних розміщена на іншому сервері
    user: 'victordudka',
    password: '20cantimetrov',
    database: 'your_database_name' // Замініть на назву вашої бази даних
});

// Підключення до бази даних MySQL
connection.connect((err) => {
    if (err) {
        console.error('Помилка підключення до бази даних:', err);
        return;
    }
    console.log('Підключено до бази даних MySQL');
});

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/main", (req, res) => {
    res.render("main");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Виконання запиту до бази даних для перевірки облікових даних
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    connection.query(query, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Помилка запиту до бази даних:', err);
            res.send("Помилка під час входу");
            return;
        }

        if (results.length > 0) {
            res.redirect("/main");
        } else {
            res.send("Невірне ім'я користувача або пароль");
        }
    });
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error('Помилка запиту до бази даних:', err);
            res.send("Помилка під час реєстрації");
            return;
        }

        console.log('Користувач зареєстрований успішно');
        res.send("Реєстрація пройшла успішно!");
    });
});

// Починаємо прослуховування запитів на заданому порті
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті: ${PORT}`);
});
