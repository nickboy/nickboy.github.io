import { test, expect } from '@playwright/test';

test.describe('Dark Mode Toggle', () => {
  test('should toggle dark → light → dark on initial page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Initial state should be dark mode
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Click toggle to switch to light mode
    const switcher = page.locator('#appearance-switcher');
    await switcher.click();
    await page.waitForTimeout(200);

    // Should now be light mode
    const classAfterFirstClick = await html.getAttribute('class');
    expect(classAfterFirstClick).not.toContain('dark');

    // Click toggle again to switch back to dark mode
    await switcher.click();
    await page.waitForTimeout(200);

    // Should now be dark mode again
    await expect(html).toHaveClass(/dark/);
  });

  test('should toggle dark → light → dark after htmx navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Navigate to another page via click (htmx boost)
    await page.click('a[href="/about/"]');
    await page.waitForTimeout(1000);

    // Should still be dark mode after navigation
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Click toggle to switch to light mode
    const switcher = page.locator('#appearance-switcher');
    await switcher.click();
    await page.waitForTimeout(200);

    // Should now be light mode
    const classAfterFirstClick = await html.getAttribute('class');
    expect(classAfterFirstClick).not.toContain('dark');

    // Click toggle again to switch back to dark mode
    await switcher.click();
    await page.waitForTimeout(200);

    // Should now be dark mode again
    await expect(html).toHaveClass(/dark/);
  });
});
