import { expect, test } from '@playwright/test';

test('home page loads and has a level-1 heading', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveCount(1);
  await expect(heading).toBeVisible();
});
