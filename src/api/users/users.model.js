import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, required: true, default: false },
  isConfirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  wishList: [{ type: Schema.Types.ObjectId, ref: 'Clothes' }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = model('User', userSchema, 'accounts_db');
export default User;
