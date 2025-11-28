const express = require("express");
const router = express.Router();
const contract = require("../config/vaultContract");

router.get("/test-contract", async (req, res) => {
  try {
    const owner = await contract.owner();
    res.json({ success: true, owner });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
