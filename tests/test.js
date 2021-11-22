const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://www.demoblaze.com/
  await page.goto('https://www.demoblaze.com/');

  // Click a:has-text("Log in")
  await page.click('a:has-text("Log in")');

  // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Polina K');

  // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '123');

  // Click button:has-text("Log in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
    page.click('button:has-text("Log in")')
  ]);

  // Click text=Samsung galaxy s6
  await page.click('text=Samsung galaxy s6');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1');

  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Add to cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1#');

  // Click text=Cart
  await page.click('text=Cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

  // Click :nth-match(:text("Delete"), 2)
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
    page.click(':nth-match(:text("Delete"), 2)')
  ]);

  // Click text=Log out
  await page.click('text=Log out');
  await expect(page).toHaveURL('https://www.demoblaze.com/index.html');

});