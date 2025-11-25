const router = require("express").Router();
const controller = require("../controllers/testController");

router.get("/", controller.health);
router.get("/test-kas", controller.testKAS);

module.exports = router;
