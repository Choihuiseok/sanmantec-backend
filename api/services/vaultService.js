const Caver = require("caver-js");
const ABI = require("../contractABI.json");
require("dotenv").config();

const caver = new Caver(process.env.RPC_URL);

// 컨트랙트 인스턴스
const contract = new caver.klay.Contract(ABI, process.env.CONTRACT_ADDRESS);

// 공통 트랜잭션 함수
async function sendTx(privateKey, method, valuePeb = 0) {
  try {
    const cleanKey = privateKey.trim().replace(/['"\s]/g, "");
    const account = caver.klay.accounts.wallet.add(cleanKey);

    const tx = {
      type: "SMART_CONTRACT_EXECUTION",
      from: account.address,
      to: process.env.CONTRACT_ADDRESS,
      gas: 800000,
      gasPrice: await caver.klay.getGasPrice(),
      data: method.encodeABI(),
      value: caver.utils.toHex(valuePeb),
    };

    const signed = await caver.klay.accounts.signTransaction(tx);
    const receipt = await caver.klay.sendSignedTransaction(signed.rawTransaction);

    // 사용 후 메모리에서 제거
    caver.klay.accounts.wallet.remove(account.address);

    return receipt;
  } catch (err) {
    throw new Error("TX Failed: " + err.message);
  }
}

module.exports = {
  // 1) Vault 생성
  createVault: async (privateKey, heir, needsWill) => {
    return await sendTx(
      privateKey,
      contract.methods.createVault(heir, needsWill)
    );
  },

  // 2) 보증금 예치
  depositMaintenance: async (privateKey, vaultId, amount) => {
    const valuePeb = caver.utils.toPeb(amount, "KLAY");
    return await sendTx(
      privateKey,
      contract.methods.depositMaintenanceKLAY(vaultId),
      valuePeb
    );
  },

  // 3) 자산 예치
  depositAsset: async (privateKey, vaultId, amount) => {
    const valuePeb = caver.utils.toPeb(amount, "KLAY");
    return await sendTx(
      privateKey,
      contract.methods.depositAssetKLAY(vaultId),
      valuePeb
    );
  },

  // 4) 상태변경 (admin only)
  updateState: async (privateKey, vaultId, newState) => {
    return await sendTx(
      privateKey,
      contract.methods.updateState(vaultId, newState)
    );
  },

  // 5) 상속자 동의
  confirmHeir: async (privateKey, vaultId) => {
    return await sendTx(
      privateKey,
      contract.methods.confirmByHeir(vaultId)
    );
  },

  // 6) admin unlock 승인
  approveUnlock: async (privateKey, vaultId) => {
    return await sendTx(
      privateKey,
      contract.methods.approveUnlock(vaultId)
    );
  },

  // 7) 최종 인출
  withdrawAll: async (privateKey, vaultId) => {
    return await sendTx(
      privateKey,
      contract.methods.withdrawAllKLAY(vaultId)
    );
  },

  // 8) 조회
  getInfo: async (vaultId) => {
    return await contract.methods.getVaultInfo(vaultId).call();
  },

  getVaultsOf: async (address) => {
    return await contract.methods.getVaultsOf(address).call();
  },
};
