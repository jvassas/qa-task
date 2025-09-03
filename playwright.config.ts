import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  use: {
    baseURL: `http://localhost:${process.env.PORT || 5173}/`,
    headless: process.env.CI ? true : false,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
