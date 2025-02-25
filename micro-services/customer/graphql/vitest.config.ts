/// <reference types="vitest" />
import path from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    includeSource: ['src/**/*.ts'], 
    env: dotenv.config({ path: path.resolve(__dirname, '.env') }).parsed,
  },
});