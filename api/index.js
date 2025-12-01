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
const authRoutes = require("./routes/auth");
const chainRoutes = require("./routes/chain");
const contractRoutes = require("./routes/contract");
const walletRoutes = require("./routes/wallet");
const sendRoutes = require("./routes/send");
const testRoutes = require("./routes/test");

// 🔥 추가된 Vault 라우트
const vaultRoutes = require("./routes/vault.routes");

// ===============================
// 헬스체크
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "Sanmantec API is running" });
});

// ===============================
// 프론트 기준 API 경로 연결
// ================================
app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);

// 🔥 vault 정상 활성화
app.use("/vault", vaultRoutes);

app.use("/chain", chainRoutes);
app.use("/contract", contractRoutes);
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
