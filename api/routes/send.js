const router = require("express").Router();
const controller = require("../controllers/sendController");

router.post("/send", controller.sendKaia);

module.exports = router;
