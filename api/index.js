// ===============================
// Sanmantec Backend – index.js (FINAL CLEAN + FIXED CORS)
// ===============================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===============================
// CORS 설정 (Vercel + Railway 완전 호환)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://sanmantec-js0j1qf9f-choihuiseoks-projects.vercel.app",
  "https://sanmantec-api-production.up.railway.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // mobile / postman / server internal calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight OPTIONS 허용
app.options("*", cors());

// ===============================
// 라우트 불러오기
// ===============================
const authRoutes = require("./routes/auth");
const chainRoutes = require("./routes/chain");
const walletRoutes = require("./routes/wallet");
const sendRoutes = require("./routes/send");
const testRoutes = require("./routes/test");
const vaultRoutes = require("./routes/vault");

// 🟥 기존 contractRoutes는 Railway 오류 원인 → 비활성화
// const contractRoutes = require("./routes/contract");

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
