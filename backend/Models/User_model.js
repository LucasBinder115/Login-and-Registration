import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);