import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";

test(`TC-E2E-02`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    expect(await page).toHaveURL('https://www.saucedemo.com/inventory.html')
});
