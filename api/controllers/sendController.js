const axios = require("axios");

exports.sendKaia = async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount) {
      return res.status(400).json({ message: "to, amount 필요" });
    }

    const peb = (BigInt(Math.floor(amount * 1e18))).toString(); // KAIA → PEB 변환

    const encodedAuth = Buffer.from(
      `${process.env.KAS_ACCESS_KEY_ID}:${process.env.KAS_SECRET_ACCESS_KEY}`
    ).toString("base64");

    const result = await axios.post(
      `${process.env.RPC_URL}/tx`,  // ← 중요: /tx 엔드포인트
      {
        from: process.env.SERVER_WALLET_ADDRESS,
        to,
        value: peb,
        gas: "300000"
      },
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
          "x-chain-id": process.env.CHAIN_ID,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json({
      ok: true,
      message: "송금 성공",
      txHash: result.data.transactionHash,
      explorer: `https://kairos.kaiascan.io/tx/${result.data.transactionHash}`
    });

  } catch (e) {
    console.error("[송금 실패]", e.response?.data || e.message);
    return res.status(500).json({
      ok: false,
      error: e.response?.data || e.message
    });
  }
};
