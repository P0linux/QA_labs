class MainPage{
  constructor(page){
    this.page = page;
  }

  async redirect(){
    // Go to https://www.demoblaze.com/
    await this.page.goto('https://www.demoblaze.com/');
  }

  async login(){
    // Click a:has-text("Log in")
  await this.page.click('a:has-text("Log in")');

  // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
  await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
  await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Polina K');

  // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
  await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
  await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '123');

  // Click button:has-text("Log in")
  await Promise.all([
    this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
    this.page.click('button:has-text("Log in")')
  ]);
  }
}

class CatalogPage{
  constructor(page){
    this.page = page;
  }

  async redirect(){
    // Click text=Samsung galaxy s6
    await this.page.click('text=Samsung galaxy s6');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1');
  }

  async addToCart(){
    // Click text=Add to cart
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.click('text=Add to cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1#');
  }

  async deleteFromCart(){
    // Click text=Cart
    await this.page.click('text=Cart');
    await expect(this.page).toHaveURL('ivalidUrl');

    // Click :nth-match(:text("Delete"), 2)
    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
      this.page.click(':nth-match(:text("Delete"), 2)')
    ]);
  }

  async logout(){
    // Click text=Log out
    await this.page.click('text=Log out');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html');
  }
}

const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.redirect();
  await mainPage.login();

  const catalogPage = new CatalogPage(page);
  await catalogPage.redirect();
  await catalogPage.addToCart();
  await catalogPage.deleteFromCart();
  await catalogPage.logout();
});