const path = require('path')

module.exports = {
  moduleDirectories: ['node_modules', path.join(__dirname, 'test')],

  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
  globalSetup: '<rootDir>/test/setupEnv.ts'
}
