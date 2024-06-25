import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { env } from './src/env/index';


export default defineConfig({
  test: {
    globals: true,
    root: './',
    onConsoleLog(log, type) {
      if (type === "stdout" && env.LOG_INFO === "false") {
        return false
      }
      if (type === "stderr" && env.LOG_ERROR === "false") {
        return false
      }
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    tsConfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    })
  ]
})