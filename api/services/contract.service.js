const { caver, serverWallet } = require("../config/caver");
const path = require("path");
const fs = require("fs");

const ABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../abi/SanmantecVault.json"), "utf-8")
);

/**
 * 컨트랙트 객체 생성
 */
function loadContract(address) {
  return new caver.contract(ABI, address);
}

/**
 * 상태 조회
 */
exports.getState = async (vaultAddress) => {
  const contract = loadContract(vaultAddress);
  return contract.methods.currentState().call();
};

/**
 * 컨트랙트 트랜잭션 실행 (Submit/Approve/Unlock 공용)
 */
exports.executeTx = async (contractAddress, method, params = []) => {
  const contract = loadContract(contractAddress);

  return await contract.methods[method](...params).send({
    from: serverWallet.address,
    gas: 500000
  });
};
