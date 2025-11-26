import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  collectCoverageFrom: [
    'src/**/*.ts',
    'libs/**/src/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.stories.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: './coverage',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleNameMapper: {
    '^@photo-library/shared/ui$': '<rootDir>/libs/shared/ui/src/index.ts',
    '^@photo-library/shared/data-access$': '<rootDir>/libs/shared/data-access/src/index.ts',
    '^@photo-library/feature/photos$': '<rootDir>/libs/features/photos/src/index.ts',
    '^@photo-library/feature/favorites$': '<rootDir>/libs/features/favorites/src/index.ts',
  },
};

export default config;
