const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ahoj, svět!');
});

module.exports = router;