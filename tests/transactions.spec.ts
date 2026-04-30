import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Products } from "../pages/products";
import { Cart } from "../pages/cart";
import { Information } from "../pages/information";
import { Overview } from "../pages/overview";
import { Complete } from "../pages/complete";
import * as XLSX from 'xlsx';
import path from "node:path";

interface TestData {
    username: string
    password: string
    firstName: string
    lastName: string
    postalCode: string
    numberOfItemsToBeAdded: string
};

const workbook = XLSX.readFile(path.join(__dirname, '../test-data/transactions.xlsx'))
const worksheet = workbook.Sheets['Transaction-TD']
const sheetToJSON = XLSX.utils.sheet_to_json<TestData>(worksheet)

sheetToJSON.forEach((row, index) => {
    test(`TC-E2E-01 - ${row.firstName} ${row.lastName}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')

        // Login Steps
        const login = new Login(page)

        await login.username.fill(row.username)
        await login.password.fill(row.password)
        await login.signin.click()

        // Product Steps
        const products = new Products(page)
        const numberOfItemsToBeAddedToCart = Number(row.numberOfItemsToBeAdded)

        for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
            await products.addToCart.nth(i).click()
        }

        expect(await products.cartBadge).toHaveText(numberOfItemsToBeAddedToCart.toString())
        await products.cart.click()

        // Cart Steps
        const cart = new Cart(page)

        await cart.checkout.click()

        // Information Steps
        const information = new Information(page)
        
        await information.firstName.fill(row.firstName)
        await information.lastName.fill(row.lastName)
        await information.postalCode.fill(row.postalCode)
        await information.continue.click()

        // Overview Steps
        const overview = new Overview(page)

        // Expected - Computed by Automation
        let subtotal = 0

        for (let i = 0; i < numberOfItemsToBeAddedToCart; i++) {
            let rawPriceText = await overview.itemPrice.nth(i).textContent()
            subtotal = subtotal + Number(rawPriceText?.replace('$', ''))
        }

        const expectedItemTotal = subtotal
        const expectedTax = (expectedItemTotal * 8 / 100)
        const expectedTotal = expectedTax + expectedItemTotal

        // Actual - UI Values
        const actualItemTotal = Number((await overview.itemTotal.textContent())?.replace('Item total: $', '')).toFixed(2)
        const actualTax = Number((await overview.tax.textContent())?.replace('Tax: $', '')).toFixed(2)
        const actualTotal = Number((await overview.total.textContent())?.replace('Total: $', '')).toFixed(2)

        // Assertion - Actual vs. Expected
        expect(actualItemTotal).toEqual(expectedItemTotal.toFixed(2))
        expect(actualTax).toEqual(expectedTax.toFixed(2))
        expect(actualTotal).toEqual(expectedTotal.toFixed(2))

        await overview.finish.click()

        // Complete Steps
        const complete = new Complete(page)
        expect(await complete.header).toHaveText('Thank you for your order!')
        expect(await complete.text).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    });
});
