const vaultService = require("../services/vaultService");

module.exports = {
  createVault: async (req, res) => {
    try {
      const { privateKey, heir, needsWill } = req.body;

      const result = await vaultService.createVault(privateKey, heir, needsWill);

      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  depositMaintenance: async (req, res) => {
    try {
      const { privateKey, vaultId, amount } = req.body;
      const result = await vaultService.depositMaintenance(privateKey, vaultId, amount);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  depositAsset: async (req, res) => {
    try {
      const { privateKey, vaultId, amount } = req.body;
      const result = await vaultService.depositAsset(privateKey, vaultId, amount);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  updateState: async (req, res) => {
    try {
      const { privateKey, vaultId, newState } = req.body;
      const result = await vaultService.updateState(privateKey, vaultId, newState);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  confirmHeir: async (req, res) => {
    try {
      const { privateKey, vaultId } = req.body;
      const result = await vaultService.confirmHeir(privateKey, vaultId);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  approveUnlock: async (req, res) => {
    try {
      const { privateKey, vaultId } = req.body;
      const result = await vaultService.approveUnlock(privateKey, vaultId);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  withdrawAll: async (req, res) => {
    try {
      const { privateKey, vaultId } = req.body;
      const result = await vaultService.withdrawAll(privateKey, vaultId);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  info: async (req, res) => {
    try {
      const { vaultId } = req.params;
      const info = await vaultService.getInfo(vaultId);
      res.json({ success: true, info });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  list: async (req, res) => {
    try {
      const { address } = req.params;
      const list = await vaultService.getVaultsOf(address);
      res.json({ success: true, list });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};
