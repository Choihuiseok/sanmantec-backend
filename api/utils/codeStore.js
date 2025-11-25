const store = {};

module.exports = {
  save(email, code) {
    store[email] = {
      code,
      expires: Date.now() + 1000 * 60 * 5 // 5분
    };
  },

  verify(email, code) {
    const data = store[email];
    if (!data) return false;
    if (Date.now() > data.expires) return false;
    return data.code === code;
  },

  remove(email) {
    delete store[email];
  }
};
