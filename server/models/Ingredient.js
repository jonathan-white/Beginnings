const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
	recipeId: {type: String, required: true},
  item: String,
	qty: Number,
  unit: String,
  displayName: String,
	description: [String],
	dateCreated: { type: Date, default: Date.now },
	dateModified: { type: Date, default: Date.now },
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;
