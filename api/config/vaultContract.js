const { caver, wallet } = require("./caver");
const abi = require("../contractABI.json");

module.exports = new caver.contract(abi, process.env.CONTRACT_ADDRESS);