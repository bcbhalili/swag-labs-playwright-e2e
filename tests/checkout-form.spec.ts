import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Products } from "../pages/products";
import { Cart } from "../pages/cart";
import { Information } from "../pages/information";
import * as XLSX from 'xlsx';
import path from "node:path";

interface TestData {
    username: string
    password: string
    firstName: string
    lastName: string
    postalCode: string
    errorMessage: string
    scenarioName: string
};

const workbook = XLSX.readFile(path.join(__dirname, '../test-data/checkout.xlsx'))
const worksheet = workbook.Sheets['Checkout-NTD']
const sheetToJSON = XLSX.utils.sheet_to_json<TestData>(worksheet)

sheetToJSON.forEach((row, index) => {
    test(`TC-E2E-012 - ${row.scenarioName}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')

        // Login Steps
        const login = new Login(page)

        await login.username.fill(row.username)
        await login.password.fill(row.password)
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

        await cart.checkout.click()

        // Information Steps
        const information = new Information(page)
        
        await information.firstName.fill(row.firstName === undefined ? "" : row.firstName)
        await information.lastName.fill(row.lastName === undefined ? "" : row.lastName)
        await information.postalCode.fill(row.postalCode === undefined ? "" : row.postalCode)
        await information.continue.click()

        expect(await information.error).toHaveText(row.errorMessage)
    });
});