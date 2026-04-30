import { Page, Locator } from "@playwright/test"

export class Complete {
    // Properties
    readonly page: Page
    readonly header: Locator
    readonly text: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.header = page.locator('.complete-header')
        this.text = page.locator('.complete-text')
    }
}