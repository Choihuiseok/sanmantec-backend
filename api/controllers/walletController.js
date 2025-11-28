const pool = require("../config/db");

// ===============================
// 1. 지갑 주소 저장 (메타마스크 방식)
// ===============================
exports.saveWallet = async (req, res) => {
  // 🔥 요청이 들어왔는지 확인
  console.log("🔥 [HIT] /wallet/save");

  // 🔥 실제 바디 내용 확인
  console.log("📦 Request Body:", req.body);

  const { userId, address } = req.body;

  // 🔥 값이 제대로 들어왔는지 확인
  console.log("🧩 userId:", userId, "address:", address);

  if (!userId || !address) {
    console.log("❌ 누락된 값:", { userId, address });
    return res.status(400).json({ message: "userId, address 필요" });
  }

  try {
    // 🔥 DB 쿼리 실행 시작 로그
    console.log("🚀 [DB QUERY] INSERT or UPDATE user_wallets...");

    await pool.query(
      `
      INSERT INTO user_wallets (user_id, address)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET address = EXCLUDED.address;
      `,
      [userId, address]
    );

    // 🔥 DB 저장 성공 로그
    console.log("✅ DB 저장 성공:", { userId, address });

    res.json({ message: "지갑 주소 저장 성공", address });

  } catch (err) {
    console.error("❌ saveWallet Error:", err);
    res.status(500).json({ message: "DB 저장 실패" });
  }
};

// ===============================
// 2. 지갑 주소 조회
// ===============================
exports.getWallet = async (req, res) => {
  console.log("🔍 [HIT] GET /wallet/:userId →", req.params);

  const { userId } = req.params;

  if (!userId)
    return res.status(400).json({ message: "userId 필요" });

  try {
    const result = await pool.query(
      "SELECT id, address, created_at FROM user_wallets WHERE user_id=$1 LIMIT 1",
      [userId]
    );

    if (result.rows.length === 0) {
      console.log("ℹ️ 지갑 없음");
      return res.json({ wallet: null });
    }

    console.log("📦 조회된 지갑:", result.rows[0]);

    res.json({ wallet: result.rows[0] });

  } catch (err) {
    console.error("❌ getWallet Error:", err);
    res.status(500).json({ message: "지갑 조회 실패" });
  }
};

// ===============================
// 3. 지갑 삭제
// ===============================
exports.deleteWallet = async (req, res) => {
  console.log("🗑️ [HIT] DELETE wallet:", req.body);

  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "userId 필요" });

  try {
    await pool.query("DELETE FROM user_wallets WHERE user_id=$1", [userId]);

    console.log("🧹 지갑 삭제 완료:", userId);

    res.json({ message: "지갑 삭제 완료" });

  } catch (err) {
    console.error("❌ deleteWallet Error:", err);
    res.status(500).json({ message: "지갑 삭제 실패" });
  }
};
