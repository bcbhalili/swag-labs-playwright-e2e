import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import * as XLSX from 'xlsx';
import path from "node:path";

interface TestData {
    username: string
    password: string
    errorMessage: string
    scenarioName: string
};

const workbook = XLSX.readFile(path.join(__dirname, '../test-data/login-negative.xlsx'))
const worksheet = workbook.Sheets['Login-NTD']
const sheetToJSON = XLSX.utils.sheet_to_json<TestData>(worksheet)

sheetToJSON.forEach((row) => {
    test(`TC-E2E-03-04-05: ${row.scenarioName}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')

        // Login Steps
        const login = new Login(page)

        await login.username.fill(row.username)
        await login.password.fill(row.password)
        await login.signin.click()

        expect(await login.error).toHaveText(row.errorMessage)
    });
});

