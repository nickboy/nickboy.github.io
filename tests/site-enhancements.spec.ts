import { test, expect } from '@playwright/test';

test.describe('Blog Content Visibility', () => {
  test('blog post content should be visible on load', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    await page.waitForLoadState('domcontentloaded');

    // Article content should be visible immediately (not hidden by AOS or scroll-reveal)
    const articleContent = page.locator('.article-content');
    await expect(articleContent).toBeVisible();

    // First paragraph/heading should be visible (above fold)
    const firstChild = page.locator('.article-content > *').first();
    await expect(firstChild).toBeVisible();
  });

  test('blog post should not contain HAHAHUGOSHORTCODE', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('HAHAHUGOSHORTCODE');
  });

  test('projects page should not contain HAHAHUGOSHORTCODE', async ({ page }) => {
    await page.goto('/projects/');
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('HAHAHUGOSHORTCODE');
  });

  test('about page should not contain HAHAHUGOSHORTCODE', async ({ page }) => {
    await page.goto('/about/');
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('HAHAHUGOSHORTCODE');
  });
});

test.describe('AOS Scroll Animations', () => {
  test('AOS library should be loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const aosLoaded = await page.evaluate(() => typeof window.AOS !== 'undefined');
    expect(aosLoaded).toBe(true);
  });

  test('AOS should be initialized with correct config', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const aosInitialized = await page.evaluate(() => {
      return window.AOS && typeof window.AOS.refresh === 'function';
    });
    expect(aosInitialized).toBe(true);
  });

  test('AOS CSS should be loaded', async ({ page }) => {
    await page.goto('/');

    const aosCss = page.locator('link[href*="aos.css"]');
    await expect(aosCss).toHaveCount(1);
  });
});

test.describe('Scroll Reveal for Cards and Blog Content', () => {
  test('below-fold article elements should get scroll-reveal class', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Some elements below the fold should have scroll-reveal class
    const revealElements = page.locator('.article-content .scroll-reveal');
    const count = await revealElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('above-fold article elements should NOT have scroll-reveal class', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // First child of article-content should be visible (no scroll-reveal)
    const firstChild = page.locator('.article-content > *').first();
    const hasScrollReveal = await firstChild.evaluate(
      (el) => el.classList.contains('scroll-reveal')
    );
    expect(hasScrollReveal).toBe(false);
  });

  test('scroll-reveal elements should become visible when scrolled into view', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Scroll to bottom to trigger all scroll-reveal elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // After scrolling, elements should have in-view class
    const visibleElements = page.locator('.article-content .scroll-reveal.in-view');
    const count = await visibleElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('above-fold cards should NOT have scroll-reveal class', async ({ page }) => {
    await page.goto('/posts/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Cards visible in viewport should not have scroll-reveal (so they stay visible)
    const firstCard = page.locator('[class*="--card"]').first();
    const count = await page.locator('[class*="--card"]').count();
    if (count > 0) {
      const hasScrollReveal = await firstCard.evaluate(
        (el) => el.classList.contains('scroll-reveal')
      );
      expect(hasScrollReveal).toBe(false);
    }
  });
});

test.describe('Posts List Visibility', () => {
  test('posts list page cards should be visible', async ({ page }) => {
    await page.goto('/posts/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Cards on the posts list page should be visible (not hidden by animations)
    const cards = page.locator('[class*="--card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // First card should be visible
    const firstCard = cards.first();
    await expect(firstCard).toBeVisible();
  });
});

test.describe('TypeIt Animation', () => {
  test('TypeIt should render on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // TypeIt creates a container with id starting with "typeit-"
    const typeitContainer = page.locator('[id^="typeit-"]');
    await expect(typeitContainer).toBeVisible();
  });

  test('TypeIt should use correct parameters', async ({ page }) => {
    await page.goto('/');

    // Check the inline script has proper JS types (not string "false")
    const scriptContent = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.map((s) => s.textContent).join('\n');
    });

    // lifeLike should be boolean false (!1), not string "false"
    expect(scriptContent).not.toContain('lifeLike:"false"');
  });
});

test.describe('Tab Animations', () => {
  test('tab panels should have fade animation CSS', async ({ page }) => {
    await page.goto('/posts/catppuccin-mocha-theming/');
    await page.waitForLoadState('domcontentloaded');

    // Check that the tab animation CSS is loaded
    const hasTabAnimation = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('tab--active')) {
              return true;
            }
          }
        } catch {
          // Cross-origin stylesheets may throw
        }
      }
      return false;
    });
    expect(hasTabAnimation).toBe(true);
  });
});

test.describe('htmx Page Transitions', () => {
  test('htmx library should be loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const htmxLoaded = await page.evaluate(() => typeof window.htmx !== 'undefined');
    expect(htmxLoaded).toBe(true);
  });

  test('body should have hx-boost attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const hxBoost = await page.locator('body').getAttribute('hx-boost');
    expect(hxBoost).toBe('true');
  });

  test('htmx transition CSS should be present', async ({ page }) => {
    await page.goto('/');

    const hasTransitionCss = await page.evaluate(() => {
      const styles = Array.from(document.querySelectorAll('style'));
      return styles.some((s) => s.textContent?.includes('htmx-swapping'));
    });
    expect(hasTransitionCss).toBe(true);
  });
});

test.describe('Favicon and Assets', () => {
  test('favicon.ico should be accessible', async ({ page }) => {
    const response = await page.goto('/favicon.ico');
    expect(response?.status()).toBe(200);
  });

  test('favicon-32x32.png should be accessible', async ({ page }) => {
    const response = await page.goto('/favicon-32x32.png');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('image/png');
  });

  test('favicon-16x16.png should be accessible', async ({ page }) => {
    const response = await page.goto('/favicon-16x16.png');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('image/png');
  });

  test('apple-touch-icon.png should be accessible', async ({ page }) => {
    const response = await page.goto('/apple-touch-icon.png');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('image/png');
  });

  test('site.webmanifest should be valid JSON', async ({ page }) => {
    const response = await page.goto('/site.webmanifest');
    expect(response?.status()).toBe(200);

    const text = await response?.text();
    const manifest = JSON.parse(text!);
    expect(manifest.name).toBe('Nick Liu');
    expect(manifest.icons).toHaveLength(3);
  });
});
