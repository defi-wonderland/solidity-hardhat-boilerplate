module.exports = {
  skipFiles: ['interfaces'],
  mocha: {
    forbidOnly: true,
    grep: '@skip-on-coverage',
    invert: true,
  },
};
