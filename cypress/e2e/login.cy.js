
import LoginPage from "../page-object/login-page"
import basicUser from "../fixtures/basicUser.json"

describe('Login Auth', () => {

    const loginPage= new LoginPage()

    beforeEach('auth', () => {
        cy.visit('/login')
        
    })

    it('sucessfull login with right username', () => {
        cy.get('#mat-input-0').should('have.attr','placeholder',"Username")
        cy.get('#mat-input-0').type('ontanke4')
        cy.get('#mat-input-1').should('have.attr','placeholder',"Password")
        cy.get('#mat-input-1').type('Good_4you')
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()
        cy.location("href").should("include", "/")
        cy.get(".mdc-button__label").filter(':contains("ontanke4")').click()
        cy.get(".mat-mdc-menu-item-text").should("have.length",2)
        cy.get(".mat-mdc-menu-item-text").eq(1).should("contain","Logout")
        cy.get("mat-icon.notranslate").eq(4).click({ force: true })
        cy.get("app-price-filter").should("contain","Price Filter")
        
        cy.get("app-book-card").should("have.length",45)
        cy.get("span.mdc-list-item__content").should("have.length",6)
        
        
    })

    it.only('Verify Successful Logout After Login', () => {
        loginPage.elements.usernameInput().should('have.attr','placeholder',"Username")

        loginPage.typeUsername(basicUser.username)
        loginPage.elements.passwordInput().should('have.attr','placeholder',"Password")

        loginPage.typePassword(basicUser.password)
        loginPage.clickLogin()
        cy.location("href").should("include", "/")
        cy.get(".mdc-button__label").contains(basicUser.username).click()
        cy.get(".mat-mdc-menu-item-text").should("have.length",2)
        cy.get(".mat-mdc-menu-item-text").eq(1).should("contain","Logout").click()
        cy.url().should("include","/login")
        
    })

    it('failed login with using wrong username', () => {
        cy.get("#mat-input-0").type("miss_rindu")
        cy.get("#mat-input-1").type("Good_4you", { sensitive: true })
        cy.intercept('POST','/api/login').as('invalidateUsername')
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()

        cy.wait('@invalidateUsername').then((interception)=>{
            expect(interception.response.statusCode).to.equal(401)
        })

        cy.get("#mat-mdc-error-0").should("contain","Login Failed. Username or Password is incorrect.")


    })

    it('failed login with using invalid password', () => {
        cy.get("#mat-input-0").type("sen_budu")
        cy.get("#mat-input-1").type("pasw0012d")
        cy.intercept('POST','/api/login').as('invalidateUsername')
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()

        cy.wait('@invalidateUsername').then((interception)=>{
            expect(interception.response.statusCode).to.equal(401)
        })

        cy.get("#mat-mdc-error-0").should("contain","Login Failed. Username or Password is incorrect.")
        
    })

    it('Login process but  password not filled in', () => {
        cy.get("#mat-input-0").type("sen_budu")
        cy.get("#mat-input-1").clear()
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()
        cy.get("#mat-mdc-error-0").should("contain","Password is required")
        
    })

    it('Login process but  username not filled in', () => {
        cy.get("#mat-input-0").clear()
        cy.get("#mat-input-1").type("sen_budu")
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()
        cy.get("#mat-mdc-error-0").should("contain","Username is required")
    })

    it('Login but leaving username and password with typing only a space', () => {
        cy.get("#mat-input-0").type(" ")
        cy.get("#mat-input-1").type(" ")
        cy.intercept('POST','/api/login').as('invalidateUsername')
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()

        cy.wait('@invalidateUsername').then((interception)=>{
            expect(interception.response.statusCode).to.equal(401)
        })
        
    })

    it('Login but leaving username and password with empty', () => {
        cy.get("#mat-input-0").clear()
        cy.get("#mat-input-1").clear()
        cy.get(".mdc-button__label").filter(':contains("Login")').eq(1).click()
        cy.get("#mat-mdc-error-0").should("contain","Username is required")
        cy.get("#mat-mdc-error-1").should("contain","Password is required")

    })

})