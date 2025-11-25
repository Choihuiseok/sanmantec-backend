const { caver, wallet } = require("../config/caver");
const vault = require("../config/contract");

// Helper: enum 값 → 문자열로 보기 좋게 변환 (선택)
const VaultState = {
  0: "READY",
  1: "DEATH_CERT_SUBMITTED",
  2: "WILL_CHECKED",
  3: "HEIR_KYC_COMPLETED",
  4: "HEIR_CONFIRMED",
  5: "UNLOCK_READY",
  6: "UNLOCKED",
  7: "SERVICE_PAUSED",
  8: "WITHDRAW_COMPLETED",
};

// 1) 현재 상태 + 잔액 조회
exports.getStatus = async (req, res) => {
  try {
    const state = await vault.methods.currentState().call();
    const needsWill = await vault.methods.needsWill().call();
    const isHeirConfirmed = await vault.methods.isHeirConfirmed().call();
    const isFrozen = await vault.methods.isFrozen().call();
    const heir = await vault.methods.heir().call();
    const owner = await vault.methods.owner().call();
    const balance = await vault.methods.getBalances().call(); // ETH/KAIA 잔액

    return res.json({
      ok: true,
      data: {
        owner,
        heir,
        state: Number(state),
        stateLabel: VaultState[state] || "UNKNOWN",
        needsWill,
        isHeirConfirmed,
        isFrozen,
        balance,
      },
    });
  } catch (err) {
    console.error("❌ getStatus 에러:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// 2) 관리자만 상태 전진: updateState(StateLogic.VaultState newState)
exports.updateState = async (req, res) => {
  try {
    const { newState } = req.body;
    if (newState === undefined) {
      return res.status(400).json({ ok: false, error: "newState 필요" });
    }

    console.log(
      `🚀 updateState 호출: from 서버지갑 ${wallet.address}, newState=${newState} (${VaultState[newState]})`,
    );

    const gas = 500_000;

    const receipt = await vault.methods
      .updateState(newState)
      .send({
        from: wallet.address,
        gas,
      });

    return res.json({
      ok: true,
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
    });
  } catch (err) {
    console.error("❌ updateState 에러:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// 3) 관리자만 상태 되돌리기: revertState(StateLogic.VaultState target)
exports.revertState = async (req, res) => {
  try {
    const { targetState } = req.body;
    if (targetState === undefined) {
      return res.status(400).json({ ok: false, error: "targetState 필요" });
    }

    console.log(
      `🚀 revertState 호출: targetState=${targetState} (${VaultState[targetState]})`,
    );

    const gas = 500_000;

    const receipt = await vault.methods
      .revertState(targetState)
      .send({
        from: wallet.address,
        gas,
      });

    return res.json({
      ok: true,
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
    });
  } catch (err) {
    console.error("❌ revertState 에러:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// 4) 관리자 unlock 승인: approveUnlock()
exports.approveUnlock = async (req, res) => {
  try {
    console.log(`🚀 approveUnlock 호출 by ${wallet.address}`);

    const gas = 300_000;

    const receipt = await vault.methods
      .approveUnlock()
      .send({
        from: wallet.address,
        gas,
      });

    return res.json({
      ok: true,
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
    });
  } catch (err) {
    console.error("❌ approveUnlock 에러:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// 5) 서비스 재개: resumeService()
exports.resumeService = async (req, res) => {
  try {
    console.log(`🚀 resumeService 호출 by ${wallet.address}`);

    const gas = 300_000;

    const receipt = await vault.methods
      .resumeService()
      .send({
        from: wallet.address,
        gas,
      });

    return res.json({
      ok: true,
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
    });
  } catch (err) {
    console.error("❌ resumeService 에러:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
