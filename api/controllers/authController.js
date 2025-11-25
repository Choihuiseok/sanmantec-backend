const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const Mailer = require("../config/mail");   // SendGrid mail.js
const CodeStore = require("../utils/codeStore");

// =============================
// 1. 이메일 중복확인
// =============================
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await pool.query(
      "SELECT 1 FROM users WHERE email=$1",
      [email]
    );

    if (result.rowCount > 0)
      return res.status(409).json({ message: "이미 가입된 이메일입니다." });

    res.json({ ok: true });
  } catch (e) {
    console.error("checkEmail Error:", e);
    res.status(500).json({ message: "서버 오류" });
  }
};

// =============================
// 2. 이메일 인증번호 전송
// =============================
exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    CodeStore.save(email, code);

    await Mailer.sendMail({
      to: email,
      subject: "Sanmantec 회원가입 인증번호",
      text: `인증번호: ${code} (5분 안에 입력하세요)`
    });

    res.json({ message: "인증번호를 전송했습니다." });
  } catch (e) {
    console.error("sendCode Error:", e);
    res.status(500).json({ message: "이메일 전송 오류" });
  }
};

// =============================
// 3. 인증번호 검증
// =============================
// 📌 이메일 인증 코드 확인
exports.verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, message: "이메일과 인증코드를 입력하세요." });
  }

  const isValid = codeStore.verify(email, code);

  if (!isValid) {
    return res.status(400).json({ success: false, message: "인증번호가 틀렸거나 만료되었습니다." });
  }

  // 인증 성공 → 저장된 인증번호 삭제
  codeStore.remove(email);

  return res.json({ success: true, message: "이메일 인증 성공!" });
};

// =============================
// 4. 회원가입
// =============================
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 12);

    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, hash]
    );

    CodeStore.remove(email);

    res.status(201).json({ message: "회원가입 완료" });
  } catch (e) {
    console.error("register Error:", e);
    res.status(500).json({ message: "서버 오류" });
  }
};

// =============================
// 5. 로그인
// =============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const row = result.rows[0];
    if (!row)
      return res.status(401).json({ message: "이메일 또는 비밀번호 오류" });

    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok)
      return res.status(401).json({ message: "이메일 또는 비밀번호 오류" });

    res.json({ message: "로그인 성공", user: { email: row.email } });
  } catch (e) {
    console.error("login Error:", e);
    res.status(500).json({ message: "서버 오류" });
  }
};
