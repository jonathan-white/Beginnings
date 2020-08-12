const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  displayName: {type: String, required: true},
	techTitle: {type: String, required: true},
	section: {type: String, required: true},
	images: [String],
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
	],
	instructions: [String],
	servingTemp: String,
	equipment: [],
	yieldInServings: {type: Number, default: undefined},
	rating: {type: Number, default: 0},
	keywords: [],
	category: String,
	subcategory: String,
	pairings: [],
	foundOnPage: Number,
	dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  duration: {
    prep: Number,
    cook: Number,
    total: Number
  }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
