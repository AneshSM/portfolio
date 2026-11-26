import { expect, test } from '@playwright/test';

// The production URL from docs/spec.md (Address).
const site = 'https://aneshsm-portfolio.vercel.app';
const title = 'Anesh Somanath Majalikar | Software Engineer, Full Stack';

// PNG: 8-byte signature, then the IHDR chunk with width and height.
function pngSize(body: Buffer) {
  expect(body.subarray(1, 4).toString('latin1')).toBe('PNG');
  return { width: body.readUInt32BE(16), height: body.readUInt32BE(20) };
}

test('the head carries title, description, canonical and social cards', async ({
  page,
}) => {
  await page.goto('/');
  const meta = (selector: string) =>
    page.locator(selector).first().getAttribute('content');

  await expect(page).toHaveTitle(title);
  expect(await meta('meta[name="description"]')).toMatch(/^Full-stack/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    site,
  );
  expect(await meta('meta[property="og:title"]')).toBe(title);
  expect(await meta('meta[property="og:url"]')).toBe(site);
  expect(await meta('meta[property="og:image"]')).toMatch(
    new RegExp(`^${site}/opengraph-image`),
  );
  expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
  expect(await meta('meta[name="twitter:image"]')).toMatch(
    new RegExp(`^${site}/twitter-image`),
  );
});

for (const route of ['/opengraph-image', '/twitter-image']) {
  test(`${route} is a 1200x630 PNG`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toBe('image/png');
    expect(pngSize(await response.body())).toEqual({
      width: 1200,
      height: 630,
    });
  });
}

test('sitemap.xml lists the production URL', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(`<loc>${site}</loc>`);
});

test('robots.txt allows crawling and names the sitemap', async ({
  request,
}) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(text).toMatch(/User-Agent: \*/i);
  expect(text).toContain('Allow: /');
  expect(text).toContain(`Sitemap: ${site}/sitemap.xml`);
});

test('no cookies are set', async ({ page, context }) => {
  await page.goto('/');
  expect(await context.cookies()).toEqual([]);
});
