const router = require("express").Router();
const factController = require("../../controllers/factController");

// Matches with "/v1/facts"
router.route("/")
	.get(factController.findAll)
  .post(factController.create);
	
// Matches with "/v1/facts/:id"
router.route("/:id")
  .get(factController.findById) 
	.put(factController.update)
	.delete(factController.remove);

module.exports = router;
