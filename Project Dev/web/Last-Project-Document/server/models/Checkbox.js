// models/Checkbox.js
const mongoose = require('mongoose');

const checkboxSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  label: { type: String, required: true },
  checked: { type: Boolean, required: true }
});

module.exports = mongoose.model('Checkbox', checkboxSchema);
