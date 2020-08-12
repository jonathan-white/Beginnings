const router = require("express").Router();
const apiRoutes = require("./api-v1");

// Middleware
router.use("/v1", apiRoutes);

module.exports = router;
