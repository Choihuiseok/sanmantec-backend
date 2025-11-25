router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  const ok = codeStore.verify(email, code);  // ⭐ verify 사용

  if (!ok) {
    return res.json({ success: false, message: "코드가 올바르지 않습니다." });
  }

  codeStore.remove(email);

  return res.json({ success: true, message: "인증 성공" });
});


// 회원가입
router.post("/register", auth.register);

// 로그인
router.post("/login", auth.login);

// 이메일 인증 코드 발송
router.post("/send-code", auth.sendCode);

// 이메일 중복 확인
router.post("/check-email", auth.checkEmail);


