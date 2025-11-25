/**
 * Custom Error 객체
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Express 에러 미들웨어
 */
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const status = err.statusCode || 500;
  const message = err.message || "서버 에러 발생";

  res.status(status).json({
    ok: false,
    message,
  });
};

module.exports = {
  AppError,
  errorHandler,
};
