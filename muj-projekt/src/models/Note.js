const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
});
module.exports = mongoose.model('Note', noteSchema);