module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/__test__/setup.js"],
  testMatch: ["**/__test__/**/*.test.js"],
  clearMocks: true,
};
