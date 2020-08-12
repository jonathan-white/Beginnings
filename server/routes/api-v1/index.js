const router = require("express").Router();
const recipeRoutes = require("./recipes");
const ingredientRoutes = require("./ingredients");
const sectionRoutes = require("./sections");
const flowerRoutes = require("./flowers");
const factRoutes = require("./facts");
const searchRoutes = require("./search");

// middleware routes
router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/sections", sectionRoutes);
router.use("/flowers", flowerRoutes);
router.use("/facts", factRoutes);
router.use("/search", searchRoutes);

// Unauthorized Route reached
router.use("*", function(req, res){
	res.status(401).send('Not Authorized');
});

module.exports = router;
