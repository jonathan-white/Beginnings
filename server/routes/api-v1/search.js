const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");
const ingredientController = require("../../controllers/ingredientController");

// Matches with "/v1/search/recipes?q=chocolate&limit=10"
router.route("/recipes?")
	.get(recipeController.matchRecipes);

// Matches with "/v1/search/ingredients?q=chocolate&apiKey=API_KEY"
router.route("/ingredients?")
  .get(ingredientController.findIngredients);
  
module.exports = router;
