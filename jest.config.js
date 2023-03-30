const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',  // 'jest-environment-jsdom' ?
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);



/*
//jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  collectCoverage:   true,
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsconfig:    "<rootDir>/tsconfig.jest.json"
    }
  },
  globalSetup:       "./global-setup.js",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",

    "\\.(css|scss|sass|less)$": "identity-obj-proxy",

    "^dnd-core$":                                      "dnd-core/dist/cjs",
    "^react-dnd$":                                     "react-dnd/dist/cjs",
    "^react-dnd-html5-backend$":                       "react-dnd-html5-backend/dist/cjs",
    "^react-dnd-touch-backend$":                       "react-dnd-touch-backend/dist/cjs",
    "^react-dnd-multi-backend/dist/esm/HTML5toTouch$": "react-dnd-multi-backend/dist/cjs",

    "^react-dnd-test-backend$": "react-dnd-test-backend/dist/cjs",
    "^react-dnd-test-utils$":   "react-dnd-test-utils/dist/cjs"
  },
  preset:                 "ts-jest/presets/js-with-babel",
  setupFiles:             ["<rootDir>/tests/setupTests.ts"],
  //setupFilesAfterEnv:     ["jest-enzyme"],
  //testEnvironment:        "enzyme",
  //testEnvironmentOptions: {"enzymeAdapter": "react16"},
  testPathIgnorePatterns: ["<rootDir>/.next", "<rootDir>/node_modules/"],
  testRegex:              "/*.test.tsx?$",
  transform:              {
    "^.+\\.[t]sx?$": "ts-jest",
    "^.+\\.[j]sx?$": "babel-jest"
  },
  verbose: true,
};

export default config;
*/