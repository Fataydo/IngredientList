import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: String,
  description: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

export default model('Category', categorySchema);
