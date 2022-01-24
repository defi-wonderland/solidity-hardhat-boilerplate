module.exports = {
  skipFiles: ['for-test', 'interfaces', 'external', 'mocks'],
  mocha: {
    forbidOnly: true,
    grep: '@skip-on-coverage',
    invert: true,
  },
};
