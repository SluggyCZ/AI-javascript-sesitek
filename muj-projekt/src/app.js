const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const notebookRoutes = require('./routes/notebookRoutes');

const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'views')); // Nastaví správný adresář pro views
app.set('view engine', 'ejs'); // Nastaví EJS jako šablonovací engine

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'tajemstvi',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', authRoutes);
app.use('/', notebookRoutes);

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));

app.get('/', (req, res) => {
  res.redirect('/login'); // Přesměruje na přihlašovací stránku
});