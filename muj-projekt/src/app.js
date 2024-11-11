const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

app.use(express.static('src/public'));
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});