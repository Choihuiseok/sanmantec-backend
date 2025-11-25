const router = require("express").Router();
const controller = require("../controllers/contractController");

router.post("/submit", controller.submitTx);

module.exports = router;
