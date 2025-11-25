const { caver } = require("../config/caver");

exports.health = (req, res) => {
  res.json({ ok: true, message: "Kaia Testnet API connected!" });
};

exports.testKAS = async (req, res) => {
  try {
    const blockNumber = await caver.rpc.klay.getBlockNumber();
    res.json({ ok: true, blockNumber });
  } catch (e) {
    console.error("[KAS 연결 실패]", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
};
