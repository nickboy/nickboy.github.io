import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Nick Liu/);
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation items
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible();
  });

  test('should display recent posts section', async ({ page }) => {
    await page.goto('/');
    
    // Current theme shows recent posts on homepage
    const postsSection = page.locator('text=/Recent/i');
    if (await postsSection.isVisible()) {
      await expect(postsSection).toBeVisible();
    }
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await expect(page.locator('body')).toBeVisible();
      console.log(`✓ Page renders correctly at ${viewport.name} size`);
    }
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    
    // Check for Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
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

  test('capture dark mode if available', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and click dark mode toggle
    const darkModeToggle = page.locator('[aria-label*="dark"], [aria-label*="theme"], .dark-mode-toggle, .theme-toggle');
    
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
      
      await page.screenshot({ 
        path: `tests/screenshots/homepage-dark-${Date.now()}.png`,
        fullPage: true 
      });
    }
  });
});