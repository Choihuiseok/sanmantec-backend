const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

/**
 * Access Token 발급
 */
exports.sign = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d", // 7일 유지
    });
  } catch (err) {
    console.error("JWT Sign Error:", err);
    throw new Error("토큰 생성 실패");
  }
};

/**
 * Access Token 검증
 */
exports.verify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT Verify Error:", err);
    throw new Error("유효하지 않은 토큰");
  }
};
