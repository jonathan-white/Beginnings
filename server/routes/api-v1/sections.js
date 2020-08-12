const router = require("express").Router();
const sectionController = require("../../controllers/sectionController");

// Matches with "/v1/sections"
router.route("/")
	.get(sectionController.findAll);

// Matches with "/v1/sections/:id-:apiKey"
router.route("/:id-:apiKey")
	.put(sectionController.update)
	.delete(sectionController.remove);

// Matches with "/v1/sections/:key"
router.route("/:key")
	.get(sectionController.findByName)
	.post(sectionController.create);

module.exports = router;
