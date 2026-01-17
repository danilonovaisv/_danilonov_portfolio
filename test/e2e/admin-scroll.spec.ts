import { expect, test } from '@playwright/test';

test('admin keeps scroll enabled when content exceeds viewport', async ({
  page,
}) => {
  await page.goto('/admin/login');
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const filler = document.createElement('div');
    filler.id = 'scroll-check';
    filler.style.height = '200vh';
    filler.style.width = '1px';
    document.body.appendChild(filler);
  });

  const initialY = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 300);
  const scrolledY = await page.evaluate(() => window.scrollY);
  expect(scrolledY).toBeGreaterThan(initialY);

  const hasScrollableArea = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight
  );
  expect(hasScrollableArea).toBeTruthy();
});
