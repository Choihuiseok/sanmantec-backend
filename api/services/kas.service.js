const axios = require("axios");
const {
  RPC_URL,
  KAS_ACCESS_KEY_ID,
  KAS_SECRET_ACCESS_KEY,
} = require("../config/env");

// KAS 인증 생성
const authHeader = "Basic " + Buffer.from(
  `${KAS_ACCESS_KEY_ID}:${KAS_SECRET_ACCESS_KEY}`
).toString("base64");

// 공통 axios instance
const kas = axios.create({
  baseURL: RPC_URL,
  headers: {
    Authorization: authHeader,
    "x-chain-id": "1001",
    "Content-Type": "application/json"
  }
});

/**
 * KAIA 송금
 */
exports.sendKaia = async (to, amount) => {
  const response = await kas.post("/v2/tx/value", {
    to,
    value: String(amount)
  });

  return response.data;
};

/**
 * ERC-20 토큰 송금용 (추후 사용)
 */
exports.sendToken = async (contractAddress, to, amount) => {
  const response = await kas.post(
    "/v2/tx/contract/execute",
    {
      to: contractAddress,
      input: amount
    }
  );

  return response.data;
};

module.exports.kas = kas;
