import { expect, test } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('should load the portfolio page and display projects', async ({
    page,
  }) => {
    await page.goto('/portfolio');

    // Check for a common element in portfolio
    await expect(page.locator('h1')).toBeVisible();

    // Verify that at least one project card is rendered
    // We expect the portfolio to have project items
    // Verify that at least one project card is rendered
    // The new ghost system uses parallax cards with role="button" instead of direct links
    const projects = page.locator('.parallax-card');
    // It might take a moment to load from Supabase if static generation isn't used or if it's dynamic
    await expect(projects.first()).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: 'test-results/portfolio-page.png' });
  });
});
