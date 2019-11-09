module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts?(x)'],
  coveragePathIgnorePatterns: ['.*\\.d\\.ts$'],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: './tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  testRegex: ['^.+\\.test\\.tsx?$'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
