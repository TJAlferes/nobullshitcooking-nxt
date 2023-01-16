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
    "^dnd-core$": "dnd-core/dist/cjs",
    "^react-dnd$": "react-dnd/dist/cjs",
    "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
    "^react-dnd-touch-backend$": "react-dnd-touch-backend/dist/cjs",
    "^react-dnd-multi-backend/dist/esm/HTML5toTouch$": "react-dnd-multi-backend/dist/cjs",
    "^react-dnd-test-backend$": "react-dnd-test-backend/dist/cjs",
    "^react-dnd-test-utils$": "react-dnd-test-utils/dist/cjs"
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