const router = require("express").Router();
const controller = require("../controllers/walletController");

router.post("/save", controller.saveWallet);
router.get("/:userId", controller.getWallet);
router.post("/delete", controller.deleteWallet);

module.exports = router;
