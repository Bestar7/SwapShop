import type {Config} from 'jest';
//import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  moduleDirectories: ["node_modules", "<rootDir>"],
  //moduleNameMapper : pathsToModuleNameMapper({"^~/(.*)": ["<rootDir>/$1"],}),
  moduleNameMapper : {"^~/(.*)": ["<rootDir>/src/$1"]},
  //moduleNameMapper : {"^~/(.*)": ["<rootDir>/$1"]},
  //rootDir: "src",
  transform: {"^.+\\.ts$": "ts-jest"},
  verbose:false,
};

export default config;