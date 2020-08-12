const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/v1/recipes"
router.route("/")
	.get(recipeController.findAll)
  .post(recipeController.create);

// Matches with "/v1/recipes/:id"
router.route("/:id")
  .get(recipeController.findById)
	.put(recipeController.update)
  .delete(recipeController.remove);

// Matches with "/v1/recipes/title/:recipe"
router.route("/title/:title")
  .get(recipeController.findByTechTitle);
  
// Matches with "/v1/recipes/section/:section"
router.route("/section/:section")
  .get(recipeController.findBySection);
  
// Matches with "/v1/recipes/:section/:id"
router.route("/:section/:title")
  .get(recipeController.findbySectionAndTechTitle);

module.exports = router;
