const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['admin', 'comum'],
    default: 'comum'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
