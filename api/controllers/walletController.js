const pool = require("../config/db");

// ===============================
// 1. 지갑 주소 저장 (메타마스크 방식)
// ===============================
exports.saveWallet = async (req, res) => {
  const { userId, address } = req.body;

  if (!userId || !address) {
    return res.status(400).json({ message: "userId, address 필요" });
  }

  try {
    // 같은 userId는 한 개의 주소만 유지하도록 UNIQUE(user_id) 를 사용하는 방식
    await pool.query(
      `
      INSERT INTO user_wallets (user_id, address)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET address = EXCLUDED.address;
      `,
      [userId, address]
    );

    res.json({ message: "지갑 주소 저장 성공", address });

  } catch (err) {
    console.error("saveWallet Error:", err);
    res.status(500).json({ message: "DB 저장 실패" });
  }
};

// ===============================
// 2. 지갑 주소 조회
// ===============================
exports.getWallet = async (req, res) => {
  const { userId } = req.params;

  if (!userId)
    return res.status(400).json({ message: "userId 필요" });

  try {
    const result = await pool.query(
      "SELECT id, address, created_at FROM user_wallets WHERE user_id=$1 LIMIT 1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ wallet: null });
    }

    res.json({ wallet: result.rows[0] });

  } catch (err) {
    console.error("getWallet Error:", err);
    res.status(500).json({ message: "지갑 조회 실패" });
  }
};

// ===============================
// 3. 지갑 삭제 (선택 기능)
// ===============================
exports.deleteWallet = async (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "userId 필요" });

  try {
    await pool.query("DELETE FROM user_wallets WHERE user_id=$1", [userId]);

    res.json({ message: "지갑 삭제 완료" });

  } catch (err) {
    console.error("deleteWallet Error:", err);
    res.status(500).json({ message: "지갑 삭제 실패" });
  }
};
