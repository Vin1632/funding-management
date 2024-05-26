module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/components/Managers-dashboard/Manager-dashboard.js",
    "<rootDir>/src/components/Home.js",
    "<rootDir>/src/components/Users-dashboard/Users-dashboard.js",
    "<rootDir>/src/components/Users-dashboard/FindFunder.js",
    "<rootDir>/src/context/Managers-dashboard/ManagersHome.js",
    "<rootDir>/src/context/UserAuthContext.js"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/Managers-dashboard/Manager-dashboard.js",
    "<rootDir>/src/components/Home.js",
    "<rootDir>/src/components/Users-dashboard/Users-dashboard.js",
    "<rootDir>/src/components/Users-dashboard/FindFunder.js",
    "<rootDir>/src/context/UserAuthContext.js",
    "<rootDir>/src/components/Managers-dashboard/ManagersHome.js"
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
