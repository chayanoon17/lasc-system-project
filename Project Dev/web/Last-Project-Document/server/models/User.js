const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' }, 
  profilePicture: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
