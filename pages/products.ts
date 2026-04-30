import { Page, Locator } from "@playwright/test"

export class Products {
    // Properties
    readonly page: Page
    readonly addToCart: Locator
    readonly cart: Locator
    readonly cartBadge: Locator
    readonly menu: Locator
    readonly logout: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.addToCart = page.locator('div.inventory_item div.inventory_item_description div button')
        this.cart = page.locator('a.shopping_cart_link')
        this.cartBadge = page.locator('.shopping_cart_badge')
        this.menu = page.locator('#react-burger-menu-btn')
        this.logout = page.locator('#logout_sidebar_link')
    }
}