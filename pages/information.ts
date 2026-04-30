import { Page, Locator } from "@playwright/test"

export class Information {
    // Properties
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continue: Locator
    readonly subheader: Locator
    readonly error: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continue = page.locator('#continue')
        this.subheader = page.locator('.header_secondary_container')
        this.error = page.locator('div.error-message-container.error h3')
    }
}