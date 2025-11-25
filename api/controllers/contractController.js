const contract = require("../config/contract");
const { wallet } = require("../config/caver");

exports.submitTx = async (req, res) => {
  try {
    const { to, value, data } = req.body;

    const receipt = await contract.methods
      .submit(to, value, data)
      .send({ from: wallet.address, gas: 500000 });

    res.json({
      message: "트랜잭션 성공",
      txHash: receipt.transactionHash,
      explorer: `https://kairos.kaiascan.io/tx/${receipt.transactionHash}`
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "컨트랙트 호출 실패", error: e.message });
  }
};
