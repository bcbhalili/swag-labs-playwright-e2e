import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Cart } from "../pages/cart";
import { Products } from "../pages/products";

test(`TC-E2E-06`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    // Login Steps
    const login = new Login(page)

    await login.username.fill('standard_user')
    await login.password.fill('secret_sauce')
    await login.signin.click()

    // Product Steps
    const products = new Products(page)
    const numberOfItemsToBeAddedToCart = 1

    await products.addToCart.first().click()
    expect(await products.addToCart.first()).toHaveText('Remove')

    expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
    await products.cart.click()

    // Cart Steps
    const cart = new Cart(page)

    expect((await cart.item.all()).length).toEqual(numberOfItemsToBeAddedToCart)
});
test(`TC-E2E-07`, async ({ page }) => {
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
    for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
        expect(await products.addToCart.nth(i)).toHaveText('Remove')
    }

    expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
    await products.cart.click()

    // Cart Steps
    const cart = new Cart(page)

    expect((await cart.item.all()).length).toEqual(numberOfItemsToBeAddedToCart)
});