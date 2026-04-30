import { Page, Locator } from "@playwright/test"

export class Login {
    // Properties
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly signin: Locator
    readonly error: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.username = page.locator('#user-name')
        this.password = page.locator('#password')
        this.signin = page.locator('#login-button')
        this.error = page.locator("//h3[@data-test='error']")
    }
}