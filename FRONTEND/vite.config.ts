import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default defineConfig({
  plugins: [vue()],
  envDir: './', // the .env file used for config (like port) location
  resolve: {
    alias: { // define alias for the 'compiler', NOT the IDE
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { // contains info about the server running this frontend 
    port: parseInt(process.env.PORT) || parseInt(process.env.FRONTEND_PORT) || 3000,
  }
})
