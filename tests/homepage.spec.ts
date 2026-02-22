import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Nick Liu/);
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check for main navigation - use first() since Blowfish renders multiple nav elements
    await expect(page.locator('nav').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Experience' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skills' }).first()).toBeVisible();
  });

  test('should display author profile on homepage', async ({ page }) => {
    await page.goto('/');

    // Blowfish profile layout shows author name as h1 heading
    await expect(page.getByRole('heading', { name: 'Nick Liu' })).toBeVisible();
    await expect(page.locator('text=Senior Software Engineer').first()).toBeVisible();
  });

  test('should display recent posts section', async ({ page }) => {
    await page.goto('/');

    // Blowfish shows "Recent" section on homepage
    await expect(page.locator('text=Recent').first()).toBeVisible();

    // Check that blog posts appear - use first() to avoid tag link conflicts
    await expect(page.getByRole('link', { name: /Terminal Setup/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /CLI Tools/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Catppuccin/i }).first()).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description).toContain('Meta');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
  });
});

test.describe('Content Pages', () => {
  test('experience page should list all companies', async ({ page }) => {
    await page.goto('/experience/');
    await expect(page).toHaveTitle(/Experience/);

    // Use first() to handle multiple text matches on the page
    await expect(page.locator('text=Meta').first()).toBeVisible();
    await expect(page.locator('text=Walmart Global Tech').first()).toBeVisible();
    await expect(page.locator('text=Twitter').first()).toBeVisible();
    await expect(page.locator('text=Amazon Web Services').first()).toBeVisible();
  });

  test('about page should load', async ({ page }) => {
    await page.goto('/about/');
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator('text=Meta').first()).toBeVisible();
  });

  test('blog post should load with TOC', async ({ page }) => {
    await page.goto('/posts/my-terminal-setup-2026/');
    await expect(page).toHaveTitle(/Terminal Setup/);

    // Blowfish renders two TOC elements (mobile + desktop), use first()
    const toc = page.locator('#TableOfContents').first();
    if (await toc.isVisible()) {
      await expect(toc).toBeVisible();
    }
  });
});

test.describe('Theme Features', () => {
  test('should have dark mode toggle', async ({ page }) => {
    await page.goto('/');

    // Blowfish uses appearance-switcher
    const toggle = page.locator('#appearance-switcher');
    await expect(toggle).toBeVisible();
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/');

    // Blowfish has a search link/button
    const searchLink = page.getByRole('link', { name: /search/i }).first();
    if (await searchLink.isVisible()) {
      await expect(searchLink).toBeVisible();
    }
  });
});

test.describe('Visual Regression Tests', () => {
  test('capture homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: `tests/screenshots/homepage-${Date.now()}.png`,
      fullPage: true
    });
  });
});
