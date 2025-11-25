require("dotenv").config();

module.exports = {
  // DB
  DATABASE_URL: process.env.DATABASE_URL,

  // Klaytn RPC / KAS
  RPC_URL: process.env.RPC_URL,
  KAS_ACCESS_KEY_ID: process.env.KAS_ACCESS_KEY_ID,
  KAS_SECRET_ACCESS_KEY: process.env.KAS_SECRET_ACCESS_KEY,

  // 서버 지갑
  SERVER_PRIVATE_KEY: process.env.SERVER_PRIVATE_KEY,
  SERVER_WALLET_ADDRESS: process.env.SERVER_WALLET_ADDRESS,

  // 블록체인 체인 ID (카이아/바오밥)
  CHAIN_ID: process.env.CHAIN_ID || "1001",

  // 인증용
  JWT_SECRET: process.env.JWT_SECRET || "SANMANTEC_SECRET",

  // 기타
  NODE_ENV: process.env.NODE_ENV
};
