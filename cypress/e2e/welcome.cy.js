import LoginPage from "../page-object/login-page"
import ShippingPage from "../page-object/shipping-page"
import basicUser from "../fixtures/basicUser.json"
import address from "../fixtures/address.json"

describe.skip(' dummy purchasing purcashing', () => {
    const loginPage= new LoginPage()
    const shippingPage = new ShippingPage()

    beforeEach('user must be login ', () => {
        cy.visit("/login")
        loginPage.typeUsername("sen_baka")
        loginPage.typePassword(basicUser.password)
        loginPage.clickLogin()
        cy.location("href").should("include", "/")
        cy.get("mat-toolbar mat-icon").eq(1).contains("favorite")
        //cy.get(".mdc-button__label").contains(basicUser.username).should("be.visible")
    })



        it('Proceed to Checkout', () => {
          cy.get("app-book-card mat-card").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
          cy.get("app-book-card mat-card app-addtocart").eq(1).click()
          cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
          cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")


            cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
            cy.get("mat-card-content td button").eq(3).contains("CheckOut").click()
            cy.url().should("include","/checkout")
            shippingPage.typeName(address.name)
            shippingPage.typeAddress1(address.addressLine1)
            shippingPage.typeAddress2(address.addressLine2)
            shippingPage.typepincode(address.pincode)
            shippingPage.typestate(address.state)
            shippingPage.clickOrder()
            cy.url().should("include","/myorders")
            cy.get("mat-card-content tbody td.mat-mdc-cell").eq(0).should("be.visible") 
            
        })

        it('Validate Empty Cart Checkout Attempt', () => {
            cy.get("mat-toolbar mat-icon").eq(2).contains("shopping_cart").click()
            cy.get("mat-card-title").contains("Your shopping cart is empty.")
            cy.url().should("include","/myorders")
        })

  })
