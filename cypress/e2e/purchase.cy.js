import LoginPage from "../page-object/login-page"
import basicUser from "../fixtures/basicUser.json"

describe.only('purcashing book activity', () => {
    const loginPage= new LoginPage()
    beforeEach('user must be login befor checkout book', () => {
        cy.visit("/login")
        loginPage.typeUsername(basicUser.username)
        loginPage.typePassword(basicUser.password)
        loginPage.clickLogin()
        cy.location("href").should("include", "/")
        cy.get(".mdc-button__label").contains(basicUser.username).should("be.visible")
    })

    it.only('Add a Single Book to Cart', () => {
        
    })

    it('Increase Book Quantity in Cart', () => {
        
    })

    it('Decrease Book Quantity in Cart', () => {
        
    })

    it('Remove a Book from Cart', () => {
    
    })

    it('Proceed to Checkout as Guest (If Allowed)', () => {
        
    })

    it('Proceed to Checkout as Logged-In User', () => {
        
    })

    it('Validate Empty Cart Checkout Attempt', () => {
        
    })

    it('Complete Purchase with Valid Payment', () => {
        
    })

    it('Verify Order Confirmation Email (If Applicable)', () => {
        
    })


})