import { Schema, model } from 'mongoose';

const clothesSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Boolean },
  color: { type: String },
  piece: { type: String },
  brand: { type: String },
  sizes: [{ type: String }],
  imageUrl: { type: String },
});

const Clothes = model('Clothes', clothesSchema, 'clothes_db');
export default Clothes;
