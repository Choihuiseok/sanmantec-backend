const { caver } = require("../config/caver");

exports.getBalance = async (req, res) => {
  try {
    const { address } = req.params;

    const balance = await caver.rpc.klay.getBalance(address);
    const kaia = caver.utils.fromPeb(balance, "KAIA");

    res.json({ balance: kaia });
  } catch (e) {
    console.error("[잔액조회 실패]", e.message);
    res.status(500).json({ message: "잔액조회 실패", error: e.message });
  }
};
