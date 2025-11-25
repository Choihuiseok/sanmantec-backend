const Caver = require("caver-js");

// === 환경변수 체크 (문제 있으면 서버가 바로 알려줌) ===
const {
  RPC_URL,
  KAS_ACCESS_KEY_ID,
  KAS_SECRET_ACCESS_KEY,
  SERVER_PRIVATE_KEY
} = process.env;

if (!RPC_URL || !KAS_ACCESS_KEY_ID || !KAS_SECRET_ACCESS_KEY || !SERVER_PRIVATE_KEY) {
  throw new Error(`
  ❌ Caver 환경변수 누락됨
  RPC_URL=${RPC_URL}
  KAS_ACCESS_KEY_ID=${KAS_ACCESS_KEY_ID}
  KAS_SECRET_ACCESS_KEY=${KAS_SECRET_ACCESS_KEY ? "있음" : "없음"}
  SERVER_PRIVATE_KEY=${SERVER_PRIVATE_KEY ? "있음" : "없음"}
  `);
}

const caver = new Caver(
  new Caver.providers.HttpProvider(RPC_URL, {
    headers: [
      {
        name: "Authorization",
        value:
          "Basic " +
          Buffer.from(`${KAS_ACCESS_KEY_ID}:${KAS_SECRET_ACCESS_KEY}`).toString("base64"),
      },
      { name: "x-chain-id", value: "1001" },
    ],
  })
);

const wallet = caver.wallet.keyring.createFromPrivateKey(SERVER_PRIVATE_KEY);
caver.wallet.add(wallet);

module.exports = { caver, wallet };
