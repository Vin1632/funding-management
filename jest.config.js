// jest.config.js

module.exports = {

   testEnvironment: 'jsdom',
   coverageDirectory: 'coverage',
   collectCoverage: true,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };
  
  
