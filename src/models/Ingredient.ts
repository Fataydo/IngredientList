import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

export default model('Ingredient', ingredientSchema);
