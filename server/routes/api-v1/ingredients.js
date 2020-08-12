const router = require("express").Router();
const ingredientController = require("../../controllers/ingredientController");

// Matches with "/v1/ingredients"
router.route("/")
  .get(ingredientController.findAll)
  .post(ingredientController.create);
	
// Matches with "/v1/ingredients/:id"
router.route("/:id")
  .get(ingredientController.findById) 
	.put(ingredientController.update)
  .delete(ingredientController.remove);
  
// Matches with "/v1/ingredients/recipe/:recipeId"
router.route("/recipe/:recipeId")
.get(ingredientController.findByRecipe);

module.exports = router;
