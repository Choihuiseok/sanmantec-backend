const router = require("express").Router();
const auth = require("../controllers/authController");

// 회원가입
router.post("/register", auth.register);

// 로그인
router.post("/login", auth.login);

// 이메일 인증 코드 발송
router.post("/send-code", auth.sendCode);

// 이메일 중복 확인
router.post("/check-email", auth.checkEmail);

// 📌 이메일 인증 확인 API 추가
router.post("/verify-code", auth.verifyCode);

module.exports = router;
