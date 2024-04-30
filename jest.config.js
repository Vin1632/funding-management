// jest.config.js

module.exports = {
    
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };
  
  