import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/es',
      format: 'es',
      sourcemap: true,
      preserveModules: true, // Preserve the module structure
    },
    {
      file: 'dist/executable.js',
      format: 'es',
      sourcemap: true,
      banner: '#!/usr/bin/env node', // Adds the shebang line
    },
  ],
  plugins: [
    typescript({
      outputToFilesystem: true,
      include: ['src/**/*'],
    }),
  ],
  external: ['node:fs/promises', 'node:path', 'node:process', 'chalk', 'glob'],
});
