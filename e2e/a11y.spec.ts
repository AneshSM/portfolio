import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// WCAG 2.2 AA is the launch gate (docs/spec.md, Targets).
const wcagTags = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
  'best-practice',
];

test('axe finds no accessibility violations', async ({ page }) => {
  await page.goto('/');
  // Open the collapsed list so its links are checked too.
  await page.getByText('Earlier learning').click();

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(results.violations).toEqual([]);
});

// Colours come from the GitHub profile README banner (issue #6).
const banner = {
  light: { background: 'rgb(245, 242, 235)', heading: 'rgb(20, 20, 20)' },
  dark: { background: 'rgb(29, 29, 31)', heading: 'rgb(247, 246, 243)' },
};

test('the theme follows the system colour scheme', async ({
  page,
}, testInfo) => {
  const scheme = testInfo.project.use.colorScheme === 'dark' ? 'dark' : 'light';
  await page.goto('/');

  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    banner[scheme].background,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'color',
    banner[scheme].heading,
  );
});

test('keyboard focus is clearly visible', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation is a desktop concern');
  await page.goto('/');

  await page.keyboard.press('Tab'); // skip link
  await page.keyboard.press('Tab'); // first nav link
  const focused = page.locator(':focus');
  await expect(focused).toHaveAttribute('href', '#projects');
  await expect(focused).toHaveCSS('outline-style', 'solid');
  const width = await focused.evaluate((el) =>
    parseFloat(getComputedStyle(el).outlineWidth),
  );
  expect(width).toBeGreaterThanOrEqual(2);
});

test('the page has subtle motion by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
  const heroAnimation = await page
    .getByRole('heading', { level: 1 })
    .evaluate((el) => getComputedStyle(el.closest('section')!).animationName);
  expect(heroAnimation).not.toBe('none');
});

test('motion is off under prefers-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  const moving = await page.evaluate(
    () =>
      [...document.querySelectorAll('*')].filter((el) => {
        const style = getComputedStyle(el);
        const seconds = (value: string) =>
          Math.max(...value.split(',').map((v) => parseFloat(v)));
        return (
          (style.animationName !== 'none' &&
            seconds(style.animationDuration) > 0.01) ||
          seconds(style.transitionDuration) > 0.01
        );
      }).length,
  );
  expect(moving).toBe(0);
});
