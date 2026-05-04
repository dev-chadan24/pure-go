import { test, expect } from '@playwright/test';

test('should add item to cart and proceed to checkout', async ({ page }) => {
  // Navigate to home page
  await page.goto('/');

  // Check that the title is correct (via SEO component)
  await expect(page).toHaveTitle(/PURE-GO/);

  // Scroll to products section to ensure visibility
  await page.evaluate(() => {
    document.getElementById('products')?.scrollIntoView();
  });

  // Click on "Add to Cart" for the first product
  // Assuming there's a button with text "Add to Cart"
  const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
  await addToCartButton.waitFor({ state: 'visible' });
  await addToCartButton.click();

  // Verify toast notification appears
  await expect(page.locator('text=added to cart!')).toBeVisible();

  // Open cart drawer (click the cart icon in navbar)
  const cartIcon = page.locator('button:has(svg.lucide-shopping-cart)').first();
  await cartIcon.click();

  // Verify item is in cart
  await expect(page.locator('text=Your Cart (1)')).toBeVisible();

  // Click proceed to checkout
  await page.locator('button:has-text("Proceed to Checkout")').click();

  // Verify redirect to checkout page (might redirect to login if not authenticated, 
  // but since we added ProtectedRoute, it should redirect to login)
  await expect(page).toHaveURL(/.*login/);
});
