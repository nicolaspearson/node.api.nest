// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/*.module.ts',
    '!src/auth/**/*.strategy.ts',
    '!src/db/**/*.ts',
    '!src/exceptions/**/*.ts',
    '!src/interfaces/**/*.ts',
    '!src/migrations/**/*.ts',
    '!src/seeds/**/*.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // The coverage reporters
  coverageReporters: process.env.CI
    ? ['lcovonly', 'text']
    : ['json', 'lcov', 'text', 'clover'],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Map aliases
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/src$1',
  },

  // The root directories
  roots: ['<rootDir>/src', '<rootDir>/test/unit'],

  // The testing env preset
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: false,
};
