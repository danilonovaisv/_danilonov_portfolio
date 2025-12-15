const tsJestConfig = {
  useESM: true,
  tsconfig: 'tsconfig.json',
};

const baseConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', tsJestConfig],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/test/**/*.test.{ts,tsx,js}'],
};

module.exports = baseConfig;
