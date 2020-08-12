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
const sections = require("../data/sections");

// HTML Route Handling
// ========================================================

// Displays the home page
router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Displays the Search Results page
router.get("/search?", function(req, res) {
	var noResults = true;
	
	const searchResults = {
			title: recipes.filter(r => r.displayName.toLowerCase().includes(req.query.q)),
			ingredients: recipes.filter(r => {
					for(var i = 0; i < r.ingredients.length; i++){
						if(r.ingredients[i].item.toLowerCase().includes(req.query.q)) return r;
					}
				}
			),
			category: recipes.filter(r => r.category.toLowerCase().includes(req.query.q)),
			rating: recipes.filter(r => r.rating == parseInt(req.query.q)),
			keywords: recipes.filter(r => {
					for(var i = 0; i < r.keywords.length; i++){
						if(r.keywords[i].toLowerCase().includes(req.query.q)) return r;
					}
				}
			)
		};

	if(searchResults["title"].length === 0 && searchResults["ingredients"].length === 0 &&
		searchResults["category"].length === 0 && searchResults["rating"].length === 0 &&
		searchResults["keywords"].length === 0) {
		noResults = true;
	} else {
		noResults = false;
	}

	res.render("search", {
		results: searchResults,
		noResults: noResults,
		query: req.query.q}
	);
});

// Renders the Foods in Bloom page
router.get("/foods-in-bloom", function(req, res) {
	res.render("flowers", {
		flowers: flowers.sort(function(a, b) {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		})
	});
});

// Displays the corresponding page
router.get("/:page", function(req, res) {
	res.sendFile(path.join(__dirname, `../public/${req.params.page}.html`),function (err) {
		if(err) {
			res.status(404).sendFile(path.join(__dirname, `../public/404.html`))
		}
	});
});

// Renders the Casual, Classic and Elegant langing pages
router.get("/recipes/:section", function(req, res) {
	if(sections[req.params.section] == undefined) {
		res.status(404).sendFile(path.join(__dirname, `../public/404.html`));
		return;
	}

	res.render("landing", {
		layout: "section",
		section: sections[req.params.section],
		recipes: recipes.filter(r => r.section === req.params.section)
	});
});

// Renders a recipe page
// Automatically renders the recipe page using a Handlebars template
router.get("/recipes/:section/:title", function(req, res) {
	const chosenRecipe = recipes.filter(r => r.techTitle === req.params.title)[0];

	if(chosenRecipe == undefined) {
		res.status(404).sendFile(path.join(__dirname, `../public/404.html`));
		return;
	}

	res.render("recipe", {
		recipe: chosenRecipe,
		fact: facts[Math.floor(Math.random()*facts.length)],
		image: chosenRecipe.images[0]
	});
});

// Custom CSS & JavaScript
// ========================================================

router.get("/assets/:type/:asset", function(req, res) {
	res.sendFile(path.join(__dirname, `../assets/${req.params.type}/${req.params.asset}`));
});

// Misc Images
router.get("/assets/images/:type/:asset", function(req, res) {
	res.sendFile(path.join(__dirname, `../assets/images/${req.params.type}/${req.params.asset}`));
});

// Recipe Images
router.get("/assets/images/recipes/:section/:asset", function(req, res) {
	res.sendFile(path.join(__dirname, `../assets/images/recipes/${req.params.section}/${req.params.asset}`));
});

module.exports = router;