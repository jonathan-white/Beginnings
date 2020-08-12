// Dependencies
// ========================================================
var express = require("express");
var router = express.Router();
var path = require("path");

// Import Data
// ========================================================
const flowers = require("../data/flowers");
const recipes = require("../data/recipes");
const facts = require("../data/facts");

// Flowers
// ========================================================

// Displays all flowers -- Obsolete
router.get("/api/flowers", function(req, res) {
	var flowersList = flowers.sort(function(a, b) {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
	return res.json(flowersList);
});

// Returns data from a single flower, or returns false -- Obsolete
router.get("/api/flowers/:name", function(req, res) {
	const chosen = req.params.name;

	for(var i = 0; i < flowers.length; i++){
		if(flowers[i].name == chosen) {
			return res.json(flowers[i]);
		}
	}
	return res.json(false);
});

// Recipes
// ========================================================

// Displays all recipes -- Obsolete
// router.get("/api/recipes", function(req, res) {
// 	var recipesList = recipes.sort(function(a, b) {
// 		if (a.id < b.id) return -1;
// 		if (a.id > b.id) return 1;
// 		return 0;
// 	});
// 	return res.json(recipesList);
// });

// Returns data from a single recipe, or returns false -- Obsolete
router.get("/api/recipes/:title", function(req, res) {
	const chosen = req.params.title;

	for(var i = 0; i < recipes.length; i++){
		if(recipes[i].techTitle == chosen) {
			return res.json(recipes[i]);
		}
	}
	return res.json(false);
});

// Returns recipes that match the selected section -- Obsolete
router.get("/api/recipes-by-section/:section", function(req, res) {
	const chosen = req.params.section;

	return res.json(recipes.filter(r => {
		if (r.section === chosen) return r;
	}));
});

router.get("/api/quickSearch/:query", (req, res) => {
	const chosen = req.params.query.toLowerCase();

	res.json(recipes.filter(r => r.displayName.toLowerCase().includes(chosen)));
});

// Returns recipes that match the query -- Obsolete
router.get("/api/findRecipes/:query", function(req, res) {
	const chosen = req.params.query.toLowerCase();

	var resultsObj = {
		// Search by title
		"title": recipes.filter(r => {
				if (r.displayName.toLowerCase().includes(chosen)) return r;
			}
		),
		// Search by keyword
		"keywords": recipes.filter(r => {
				for(var i = 0; i < r.keywords.length; i++){
					if(r.keywords[i].toLowerCase().includes(chosen)) return r;
				}
			}
		),
		// Search by category
		"category": recipes.filter(r => {
				if (r.category.toLowerCase().includes(chosen)) return r;
			}
		),
		// Search by ingredients
		"ingredients": recipes.filter(r => {
				for(var i = 0; i < r.ingredients.length; i++){
					if(r.ingredients[i].item.toLowerCase().includes(chosen)) return r;
				}
			}
		),
		// Search by rating
		"rating": recipes.filter(r => {
				if (r.rating === parseInt(chosen)) return r;
			}
		),
	}

	return res.json(resultsObj);
});


// Facts
// ========================================================

// returns all facts -- Obsolete
router.get("/api/facts", function(req, res) {
	return res.json(facts);
});

// Returns a random fact -- Obsolete
router.get("/api/randomFact", function(req, res) {
	const chosen = Math.floor(Math.random()*facts.length);
	return res.json(facts[chosen]);
});

// Returns all facts matching the specified theme -- Obsolete
router.get("/api/facts/theme/:theme", function(req, res) {
	const chosen = req.params.theme.toLowerCase();

	var result = facts.filter(f => {
		for(var i = 0; i < f.themes.length; i++){
			if(f.themes[i].toLowerCase().includes(chosen)) return f;
		}
	});

	return res.json(result);

});

// Returns data from a single fact, or returns false -- Obsolete
router.get("/api/facts/:id", function(req, res) {
	const chosen = req.params.id;

	for(var i = 0; i < facts.length; i++){
		if(facts[i].id === parseInt(chosen)) {
			return res.json(facts[i]);
		}
	}
	return res.json(false);
});

module.exports = router;


// Utility
// ========================================================

// Returns an array of all equipment items that have been recorded
router.get("/api/show-equipment-needed", function(req, res) {
	const result = [];

	recipes.filter(r => {
		if (r.equipment.length) return r;
	}).forEach(r => {
		for(var i = 0; i < r.equipment.length; i++){
			if(!result.includes(r.equipment[i])) {
				result.push(r.equipment[i]);
			}
		}
	});

	return res.json(result);
});

// Returns an array of all ingredients
router.get("/api/show-ingredients", function(req, res) {
	const result = [];

	recipes.filter(r => {
		if (r.ingredients.length) return r;
	}).forEach(r => {
		for(var i = 0; i < r.ingredients.length; i++){
			if(!result.includes(r.ingredients[i].item)) {
				result.push(r.ingredients[i].item);
			}
		}
	});

	return res.json(result);
});

// Returns an array of all categories that have been recorded
router.get("/api/show-categories", function(req, res) {
	const result = [];

	recipes.filter(r => {
		if (r.category) return r;
	}).forEach(r => {
		if(!result.includes(r.category)) {
			result.push(r.category);
		}
	});

	return res.json(result);
});

// Returns an array of all flower suggestions that have been recorded
router.get("/api/show-flower-pairings", function(req, res) {
	const result = [];

	flowers.filter(r => {
		if (r.pairings.length) return r;
	}).forEach(r => {
		for(var i = 0; i < r.pairings.length; i++){
			if(!result.includes(r.pairings[i])) {
				result.push(r.pairings[i]);
			}
		}
	});

	return res.json(result);
});


