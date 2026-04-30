import { Page, Locator } from "@playwright/test"

export class Cart {
    // Properties
    readonly page: Page
    readonly checkout: Locator
    readonly item: Locator
    readonly remove: Locator
    readonly subheader: Locator
    readonly continueShopping: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.checkout = page.locator('#checkout')
        this.item = page.locator('.cart_item')
        this.remove = page.locator('.btn.btn_secondary.btn_small.cart_button')
        this.subheader = page.locator('.header_secondary_container')
        this.continueShopping = page.locator('#continue-shopping')
    }
}