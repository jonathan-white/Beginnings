const router = require("express").Router();
const flowerController = require("../../controllers/flowerController");

// Matches with "/v1/flowers"
router.route("/")
	.get(flowerController.findAll)
  .post(flowerController.create);
	
// Matches with "/v1/flowers/:id"
router.route("/:id")
  .get(flowerController.findById) 
	.put(flowerController.update)
	.delete(flowerController.remove);

module.exports = router;
