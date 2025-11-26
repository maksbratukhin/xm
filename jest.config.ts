export default {
  preset: './jest.preset.js',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|mts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'libs/**/src/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.stories.ts',
    '!**/node_modules/**',
  ],
};
