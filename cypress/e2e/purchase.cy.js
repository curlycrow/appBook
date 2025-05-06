import LoginPage from "../page-object/login-page"
import ShippingPage from "../page-object/shipping-page"
import basicUser from "../fixtures/basicUser.json"
import address from "../fixtures/address.json"

describe('purcashing book activity', () => {
    const loginPage= new LoginPage()
    const shippingPage = new ShippingPage()

    beforeEach('user must be login before checkout book', () => {
        cy.visit("/login")
        loginPage.typeUsername(basicUser.username)
        loginPage.typePassword(basicUser.password)
        loginPage.clickLogin()
        cy.location("href").should("include", "/")
        cy.get("mat-toolbar mat-icon").eq(1).contains("favorite")
        cy.get(".mdc-button__label").contains(basicUser.username).should("be.visible")
    })

    

    it('Add a Single Book to Cart', () => {
        cy.get("app-book-card").should("have.length",45)
        cy.get("app-book-card mat-card").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("app-book-card mat-card app-addtocart").eq(1).click()
        cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
        cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        
    })

    it('Increase Book Quantity from dashboard', () => {
        cy.get("app-book-card mat-card").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("app-book-card mat-card app-addtocart").eq(1).click()
    })

    it('Increase Book Quantity in Cart', () => {
        cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
        cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("mat-card-content tbody td button.mdc-icon-button").eq(1).contains("add_circle").click()
        
    })

    it('Decrease Book Quantity in Cart', () => {
        cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
        cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("mat-card-content tbody td button.mdc-icon-button").eq(0).contains("remove_circle").click()
    })

    it('Remove a Book from Cart', () => {
        cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
        cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("mat-card-content tbody td button.mdc-icon-button").eq(2).contains("delete").click()
    
    })

    it('Proceed to Checkout as Guest (If Allowed)', () => {
        
    })

    it.only('Proceed to Checkout as Logged-In User', () => {
        cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
        cy.get("mat-card-content td button").eq(3).contains("CheckOut").click()
        cy.url().should("include","/checkout")
        shippingPage.typeName(address.name)
        shippingPage.typeAddress1(address.addressLine1)
        shippingPage.typeAddress2(address.addressLine2)
        shippingPage.typepincode(address.pincode)
        shippingPage.typestate(address.state)
        
        
    })

    it('Validate Empty Cart Checkout Attempt', () => {

    })

    it('Complete Purchase with Valid Payment', () => {
        
    })

    it('Verify Order Confirmation Email (If Applicable)', () => {
        
    })


})