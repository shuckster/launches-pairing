import { test, expect } from '@playwright/test';

test('should open the page and check we have 10 launch cards', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText("SpaceX's First 10 Launches");
  expect(await page.locator('.launch-card').count()).toBe(10);
});
