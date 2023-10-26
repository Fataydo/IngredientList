import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: String,
  description: String,
  steps: [String],
  rating: Number,
  images: [String],
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient', default: [] }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', default: [] }],
});

export default model('Recipe', recipeSchema);
