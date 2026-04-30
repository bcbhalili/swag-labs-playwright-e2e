import { Page, Locator } from "@playwright/test"

export class Overview {
    // Properties
    readonly page: Page
    readonly itemPrice: Locator
    readonly itemTotal: Locator
    readonly tax: Locator
    readonly total: Locator
    readonly finish: Locator
    readonly cancel: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.itemPrice = page.locator('.inventory_item_price')
        this.itemTotal = page.locator('.summary_subtotal_label')
        this.tax = page.locator('.summary_tax_label')
        this.total = page.locator('.summary_total_label')
        this.finish = page.locator('#finish')
        this.cancel = page.locator('#cancel')
    }
}