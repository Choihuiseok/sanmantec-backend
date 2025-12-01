const router = require("express").Router();
const c = require("../controllers/vaultController");

router.post("/create", c.createVault);
router.post("/deposit-maintenance", c.depositMaintenance);
router.post("/deposit-asset", c.depositAsset);
router.post("/update-state", c.updateState);
router.post("/confirm-heir", c.confirmHeir);
router.post("/approve-unlock", c.approveUnlock);
router.post("/withdraw", c.withdrawAll);

router.get("/info/:vaultId", c.info);
router.get("/list/:address", c.list);

module.exports = router;
