import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: String,
  description: String,
  steps: [String],
  rating: Number,
  images: [String],
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export default model('Recipe', recipeSchema);
