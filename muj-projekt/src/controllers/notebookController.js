const { loadDatabase, saveDatabase } = require('../utils/database');

// Načtení poznámky pro aktuálního uživatele
exports.getNotebook = (req, res) => {
  const db = loadDatabase();
  const note = db.notes.find(note => note.userId === req.session.userId);
  res.render('notebook', { note });
};

// Uložení nebo aktualizace poznámky
exports.saveNote = (req, res) => {
  const { content } = req.body;
  const db = loadDatabase();
  
  // Najde existující poznámku pro daného uživatele, pokud existuje
  let note = db.notes.find(note => note.userId === req.session.userId);

  if (note) {
    // Aktualizuje obsah poznámky
    note.content = content;
  } else {
    // Přidá novou poznámku
    db.notes.push({
      id: Date.now(),
      userId: req.session.userId,
      content,
    });
  }

  saveDatabase(db);
  res.redirect('/notebook');
};