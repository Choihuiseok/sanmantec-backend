const { ethers } = require("ethers");
require("dotenv").config();

const abi = require("../contractABI.json");

if (!process.env.RPC_URL) {
  throw new Error("❌ Missing RPC_URL in .env");
}
if (!process.env.CONTRACT_ADDRESS) {
  throw new Error("❌ Missing CONTRACT_ADDRESS in .env");
}
if (!process.env.SERVER_PRIVATE_KEY) {
  throw new Error("❌ Missing SERVER_PRIVATE_KEY in .env");
}

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// 지갑 객체 (서버에서 서명 가능)
const wallet = new ethers.Wallet(process.env.SERVER_PRIVATE_KEY, provider);

// 컨트랙트 인스턴스 생성
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

module.exports = contract;
