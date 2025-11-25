const pool = require("../config/db");

/**
 * 지갑 저장
 */
exports.saveWallet = async (userId, address, keystore) => {
  return pool.query(
    `INSERT INTO wallets (user_id, address, keystore)
     VALUES ($1, $2, $3)`,
    [userId, address, keystore]
  );
};

/**
 * 지갑 조회
 */
exports.getWallets = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM wallets WHERE user_id=$1 ORDER BY id DESC`,
    [userId]
  );
  return result.rows;
};

/**
 * 지갑 삭제
 */
exports.deleteWallet = async (walletId) => {
  return pool.query(
    `DELETE FROM wallets WHERE id=$1`,
    [walletId]
  );
};
