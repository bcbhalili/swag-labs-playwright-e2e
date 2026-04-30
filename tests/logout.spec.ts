import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Products } from "../pages/products";

test(`TC-E2E-15`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    // Products Steps
    const products = new Products(page)

    await products.menu.click()
    await products.logout.click()

    expect(await page).toHaveURL('https://www.saucedemo.com/')
});
