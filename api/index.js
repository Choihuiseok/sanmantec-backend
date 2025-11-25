// ===============================
// Sanmantec Backend – index.js (FINAL)
// ===============================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===============================
// CORS 설정
// ===============================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// ===============================
// 라우트 불러오기
// ===============================

const authRoutes = require("./routes/auth");       // 회원가입, 로그인, 이메일 인증
const chainRoutes = require("./routes/chain");     // 체인 정보 조회
const contractRoutes = require("./routes/contract"); // 트랜잭션 관련
const walletRoutes = require("./routes/wallet");   // 지갑 저장/조회
// const vaultRoutes = require("./routes/vault");  ❌ 잠시 비활성화 (서버 에러 원인)
const sendRoutes = require("./routes/send");       // 토큰 전송
const testRoutes = require("./routes/test");       // 헬스체크용

// ===============================
// 헬스체크
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "Sanmantec API is running" });
});

// ===============================
// 프론트 기준 API 경로 연결
// ===============================

// 🔥 회원가입 / 로그인 / 이메일 인증 / 중복확인
app.use("/auth", authRoutes);

// 🔥 지갑 관련
app.use("/wallet", walletRoutes);

// ❌ vault는 현재 비활성화
// app.use("/vault", vaultRoutes);

// 🔥 체인 정보 조회
app.use("/chain", chainRoutes);

// 🔥 스마트컨트랙트 트랜잭션
app.use("/contract", contractRoutes);

// 🔥 토큰 전송
app.use("/send", sendRoutes);

// 🔥 테스트
app.use("/test", testRoutes);

// ===============================
// 서버 시작
// ===============================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Sanmantec API running on port ${PORT}`);
});

module.exports = app;
