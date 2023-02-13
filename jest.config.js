/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const nextJest = require('next/jest');
const tsConfig = require('./tsconfig.json');

/**
 * Convert tsconfig paths to jest moduleNameMapper
 */
function moduleNameMapperFromTsConfig(tsConfig) {
  return Object.entries(tsConfig.compilerOptions.paths).reduce(
    (acc, [tsAlias, [tsPath]]) => {
      const jestAlias = tsAlias.replace('/*', '/(.*)$').replace('@/', '^@/');
      const jestPath = `<rootDir>/${tsPath.replace('/*', '/$1')}`;
      return Object.assign(acc, { [jestAlias]: jestPath });
    },
    {}
  );
}

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: moduleNameMapperFromTsConfig(tsConfig),
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
