import { expect, test } from '@playwright/test';

const sections = ['projects', 'how-i-build', 'experience', 'skills', 'contact'];

test('home page loads and has a level-1 heading', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveCount(1);
  await expect(heading).toBeVisible();
});

test('every section anchor in the nav reaches its section', async ({
  page,
}) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Sections' });

  for (const id of sections) {
    await nav.locator(`a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`section#${id}`)).toBeInViewport();
  }
});

test('the skip link is first in tab order and moves focus to main', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'keyboard navigation is a desktop concern');
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('résumé and email links are present', async ({ page }) => {
  await page.goto('/');

  const resume = page.getByRole('link', { name: 'Download résumé (PDF)' });
  await expect(resume.first()).toBeVisible();
  await expect(resume.first()).toHaveAttribute('href', '/resume.pdf');

  const email = page.getByRole('link', { name: 'Email me' });
  await expect(email.first()).toBeVisible();
  await expect(email.first()).toHaveAttribute(
    'href',
    'mailto:aneshsm204@gmail.com',
  );
});

test('the résumé button downloads the PDF instead of opening it', async ({
  page,
}) => {
  await page.goto('/');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'Download résumé (PDF)' }).first().click(),
  ]);
  expect(download.suggestedFilename()).toBe(
    'Anesh-Somanath-Majalikar-Resume.pdf',
  );
});

test('copy email puts the address on the clipboard', async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');

  await page.getByRole('button', { name: 'Copy email' }).first().click();
  await expect(page.getByText('Email address copied').first()).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'aneshsm204@gmail.com',
  );
});

test('earlier learning is collapsed until opened', async ({ page }) => {
  await page.goto('/');

  const earlier = page.locator('details', { hasText: 'Earlier learning' });
  await expect(earlier).not.toHaveAttribute('open');
  await earlier.getByText('Earlier learning').click();
  await expect(earlier).toHaveAttribute('open');
  await expect(earlier.getByRole('link').first()).toBeVisible();
});
