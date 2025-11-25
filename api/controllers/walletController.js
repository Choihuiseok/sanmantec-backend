const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.saveWallet = async (req, res) => {
  const { userId, address, keystore } = req.body;

  if (!userId || !address || !keystore)
    return res.status(400).json({ message: "userId, address, keystore 필요" });

  try {
    await pool.query(
      "INSERT INTO wallets (user_id, address, keystore_json) VALUES ($1,$2,$3)",
      [userId, address, keystore]
    );

    res.json({ message: "지갑 저장 성공", address });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 저장 실패" });
  }
};

exports.getWallets = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      "SELECT address, keystore_json FROM wallets WHERE user_id=$1 ORDER BY id DESC",
      [userId]
    );

    res.json({ wallets: result.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 목록 조회 실패" });
  }
};

exports.deleteWallet = async (req, res) => {
  const { userId, password, address } = req.body;

  try {
    const u = await pool.query(
      "SELECT password_hash FROM users WHERE user_id=$1",
      [userId]
    );
    const user = u.rows[0];
    if (!user) return res.status(401).json({ message: "인증 실패" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "인증 실패" });

    await pool.query(
      "DELETE FROM wallets WHERE user_id=$1 AND address=$2",
      [userId, address]
    );

    res.json({ message: "지갑 삭제 완료" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 삭제 실패" });
  }
};
