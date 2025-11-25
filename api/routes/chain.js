const router = require("express").Router();
const controller = require("../controllers/chainController");

router.get("/balance/:address", controller.getBalance);

module.exports = router;
