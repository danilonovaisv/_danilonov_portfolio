import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page and show core sections', async ({ page }) => {
    await page.goto('/');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Danilo Novais | Creative Developer/);

    // Verify HomeHero is visible
    // Based on src/app/page.tsx, HomeHero is a component. I'll check for a common element or text.
    await expect(page.locator('main')).toBeVisible();

    // Verify Featured Projects section
    // I'll look for text that typically appears in this section
    // Verify Featured Projects section or Portfolio Showcase
    // Check for "portfólio showcase" heading which is prominent
    await expect(
      page.locator('h2', { hasText: /portfólio/i }).first()
    ).toBeVisible();

    // Take a screenshot for verification
    await page.screenshot({ path: 'test-results/home-page.png' });
  });
});
