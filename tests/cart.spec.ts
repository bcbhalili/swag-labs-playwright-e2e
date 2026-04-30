import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Cart } from "../pages/cart";
import { Products } from "../pages/products";
import { Information } from "../pages/information";

test(`TC-E2E-09`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    // Product Steps
    const products = new Products(page)
    const numberOfItemsToBeAddedToCart = 6

    for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
        await products.addToCart.nth(i).click()
    }

    expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
    await products.cart.click()

    // Cart Steps
    const cart = new Cart(page)

    expect(await page).toHaveURL('https://www.saucedemo.com/cart.html')
    expect(await cart.subheader).toHaveText('Your Cart')
});
test(`TC-E2E-10`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    // Product Steps
    const products = new Products(page)
    const numberOfItemsToBeAddedToCart = 6

    for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
        await products.addToCart.nth(i).click()
    }

    expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
    await products.cart.click()

    // Cart Steps
    const cart = new Cart(page)

    expect(await page).toHaveURL('https://www.saucedemo.com/cart.html')
    await cart.continueShopping.click()
    expect(await page).toHaveURL('https://www.saucedemo.com/inventory.html')
});
test(`TC-E2E-11`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    // Product Steps
    const products = new Products(page)
    const numberOfItemsToBeAddedToCart = 6

    for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
        await products.addToCart.nth(i).click()
    }

    expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
    await products.cart.click()

    // Cart Steps
    const cart = new Cart(page)

    expect(await page).toHaveURL('https://www.saucedemo.com/cart.html')
    await cart.checkout.click()

    // Information Steps
    const information = new Information(page)

    expect(await page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    expect(await information.subheader).toHaveText('Checkout: Your Information')
});