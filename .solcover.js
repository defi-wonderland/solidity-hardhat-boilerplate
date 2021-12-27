module.exports = {
  skipFiles: ['for-test', 'interfaces', 'external'],
  mocha: {
    forbidOnly: true,
    grep: '@skip-on-coverage',
    invert: true,
  },
};
