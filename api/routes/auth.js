const router = require("express").Router();
const auth = require("../controllers/authController");

// 🔥 추가해야 했던 부분 (오류 원인)
const codeStore = require("../utils/codeStore");

// 회원가입
router.post("/register", auth.register);

// 로그인
router.post("/login", auth.login);

// 이메일 인증 코드 발송
router.post("/send-code", auth.sendCode);

// 이메일 중복 확인
router.post("/check-email", auth.checkEmail);

// 📌 이메일 인증 확인 API 추가
router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  const saved = codeStore.getCode(email);

  if (!saved) {
    return res.json({ success: false, message: "인증 코드가 없습니다." });
  }

  if (saved != code) {
    return res.json({ success: false, message: "코드가 올바르지 않습니다." });
  }

  // 인증 성공 → 코드 삭제
  codeStore.deleteCode(email);

  return res.json({ success: true, message: "인증 성공" });
});

module.exports = router;
