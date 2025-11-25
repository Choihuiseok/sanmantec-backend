const router = require("express").Router();
const auth = require("../controllers/authController");
const codeStore = require("../utils/codeStore");

// 회원가입
router.post("/register", auth.register);

// 로그인
router.post("/login", auth.login);

// 이메일 인증 코드 발송
router.post("/send-code", auth.sendCode);

// 이메일 중복 확인
router.post("/check-email", auth.checkEmail);

// 이메일 인증 확인
router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  const ok = codeStore.verify(email, code);

  if (!ok) {
    return res.json({ success: false, message: "잘못된 인증번호입니다." });
  }

  codeStore.remove(email);

  return res.json({ success: true, message: "인증 성공" });
});

module.exports = router;
