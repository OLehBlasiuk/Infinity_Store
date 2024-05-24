const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/main", (req, res) => {
    res.render("main");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});

// Функція для хешування пароля SHA-256
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Функція для перевірки унікальності імені користувача та адреси електронної пошти
function isUserUnique(username, email) {
    // Логіка перевірки в базі даних чи інша система перевірки унікальності
    return true; // Повертаємо true, якщо користувач унікальний, інакше false
}

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Ваша логіка перевірки в базі даних
    // Тут ми просто порівнюємо зразок хешу, який зберігаємо у пам'яті, зі зразком хешу введеного пароля.
    // В реальній системі вам слід перевірити пароль у базі даних, використовуючи хеш, збережений для користувача під час реєстрації.
    const sampleHashedPassword = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // Приклад хешу паролю
    const hashedPassword = hashPassword(password); // Повинен бути замінений на перевірку в базі даних
    if (username === "example" && hashedPassword === sampleHashedPassword) {
        res.redirect("/main"); // Перенаправлення на головну сторінку після успішного входу
    } else {
        res.send("Invalid username or password");
    }
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    const isPasswordValid = passwordRegex.test(password) && password.length >= 8;

    const isUsernameValid = username.length <= 32;

    if (!isUserUnique(username, email)) {
        return res.render("signup", { error: "Username or email already exists" });
    }

    if (!isPasswordValid) {
        return res.render("signup", { error: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long" });
    }

    if (!isUsernameValid) {
        return res.render("signup", { error: "Username must not exceed 32 characters" });
    }

    if (password !== confirmPassword) {
        return res.render("signup", { error: "Passwords do not match" });
    }

    const hashedPassword = hashPassword(password);

    const userData = {
        username: username,
        email: email,
        password: hashedPassword,
    };

    const userDataString = JSON.stringify(userData);

    fs.writeFile('userData.txt', userDataString + '\n', { flag: 'a+' }, (err) => {
        if (err) {
            console.error(err);
            res.send('Error saving data.');
        } else {
            console.log('Data saved successfully.');
            res.send("Signup successful!");
        }
    });
});
