// ===============================
// Sanmantec Backend – index.js (FINAL CLEAN)
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
const authRoutes = require("./routes/auth");
const chainRoutes = require("./routes/chain");
// ❌ 기존 contractRoutes 제거 (Railway 에러 원인)
// const contractRoutes = require("./routes/contract");
const walletRoutes = require("./routes/wallet");
const sendRoutes = require("./routes/send");
const testRoutes = require("./routes/test");

// 🔥 새로 추가한 Vault 라우트
const vaultRoutes = require("./routes/vault");

// ===============================
// 헬스체크
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "Sanmantec API is running" });
});

// ===============================
// 프론트 기준 API 경로 연결
// ===============================
app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);

// 🔥 vault 라우트 활성화
app.use("/vault", vaultRoutes);

app.use("/chain", chainRoutes);

// ❌ 기존 contract 라우트 제거
// app.use("/contract", contractRoutes);

app.use("/send", sendRoutes);
app.use("/test", testRoutes);

// ===============================
// 서버 시작
// ===============================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Sanmantec API running on port ${PORT}`);
});

module.exports = app;
