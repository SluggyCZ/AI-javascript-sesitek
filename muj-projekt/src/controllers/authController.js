const bcrypt = require('bcryptjs');
const { loadDatabase, saveDatabase } = require('../utils/database');

// Registrace uživatele
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const db = loadDatabase();

  // Zkontroluje, zda už uživatel existuje
  if (db.users.find(user => user.email === email)) {
    return res.status(400).send('Uživatel s tímto e-mailem už existuje.');
  }

  // Zhashuje heslo a uloží nového uživatele
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.users.push({ id: Date.now(), username, email, password: hashedPassword });
  saveDatabase(db);

  res.redirect('/login');
};

// Přihlášení uživatele
exports.login = (req, res) => {
  const { email, password } = req.body;
  const db = loadDatabase();

  // Najde uživatele podle e-mailu
  const user = db.users.find(user => user.email === email);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/notebook');
  } else {
    res.status(400).send('Nesprávné přihlašovací údaje.');
  }
};

// Odhlášení uživatele
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};