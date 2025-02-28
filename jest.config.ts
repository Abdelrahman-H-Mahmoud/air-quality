import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/types/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js'],
  clearMocks: true,
  setupFiles: ['<rootDir>/tests/setup.ts']
};

export default config; 