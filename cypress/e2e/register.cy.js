import RegisterPage from "../page-object/register-page"
import register from "../fixtures/register.json"

describe('Functional Test Register Menu', () => {

    const registerPage= new RegisterPage()

    beforeEach(()=>{
        cy.log("start from visit login test")
        cy.visit('/register')
    })
    it.skip('Successful Registration with Valid Data', () => {
        cy.get("#mat-input-0").type("baka")
        cy.get("#mat-input-1").type("senco")
        cy.get("#mat-input-2").type("sen_budu10")
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')
        cy.contains('button', 'Register').click()

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include('sen_budu10')

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })

        cy.intercept('POST','/api/user').as('createUser')
        cy.contains('button', 'Register').click()

        cy.wait('@createUser').then((interception)=>{

            expect(interception.response.statusCode).to.equal(200)
        })
        cy.url().should("include","/login")
        cy.get('#mat-input-0').should('have.attr','placeholder',"Username")
        cy.get('#mat-input-1').should('have.attr','placeholder',"Password")


    })

    it('Registration with Existing Username', () => {
        cy.get("#mat-input-0").type("baka")
        cy.get("#mat-input-1").type("senco")
        cy.get("#mat-input-2").type("sen_budu")
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include('sen_budu')

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
        cy.get("#mat-mdc-error-0").should("contain", "User Name is not available")

    })

    it('Registration with Password Mismatch', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").type("sampan")
        registerPage.typeUsername(register.username)
        registerPage.typePassword(register.password)
        registerPage.typeREPassword("kukung_do12")
        cy.get("#mat-radio-0-input").check()
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include(register.username)

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
        cy.get("#mat-mdc-error-0").should("contain", " Password do not match ")

    })

    it('Registration with Empty Username', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").type("sampan")
        cy.get("#mat-input-2").clear()
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        cy.contains('button', 'Register').click()

        cy.get("#mat-mdc-error-0").should("contain", "User Name is required")
    })

    it('Registration with Weak Password', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").type("sampan")
        cy.get("#mat-input-2").type(register.username)
        cy.get("#mat-input-3").type("123456")
        cy.get("#mat-input-4").type("123456")
        cy.get("#mat-radio-0-input").check()
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include(register.username)

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
        cy.get("#mat-mdc-error-0").should("contain", "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number")
        
    })

    it('Registration with Empty First Name', () => {
        cy.get("#mat-input-0").clear()
        cy.get("#mat-input-1").type("sampan")
        cy.get("#mat-input-2").type(register.username)
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include(register.username)

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
        cy.get("#mat-mdc-error-0").should("contain", "First Name is required")
    })

    it('Registration with Empty Last Name', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").clear()
        cy.get("#mat-input-2").type(register.username)
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include(register.username)

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
        cy.get("#mat-mdc-error-0").should("contain", "Last Name is required")
    })

    it('Registration with Empty Gender', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").type("panda")
        cy.get("#mat-input-2").type(register.username)
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        
        // cy.contains('button', 'Register').click()
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include(register.username)

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })

        
    })

    it('Registration with Special Characters in Username', () => {
        cy.get("#mat-input-0").type("kiki")
        cy.get("#mat-input-1").type("panda")
        cy.get("#mat-input-2").type("kiki_p@n*")
        registerPage.typePassword(register.password)
        registerPage.typeREPassword(register.password)
        cy.get("#mat-radio-0-input").check()
        
        cy.intercept('GET', '/api/user/validateUserName/*').as('validateUsername')
        cy.contains('button', 'Register').click()

        cy.wait('@validateUsername').then((interception) => {
            // Verify the API was called with the correct username
            expect(interception.request.url).to.include('kiki_p@n*')

            
            // Validate response
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.body).to.have.property('isAvailable', true);

        })
    })
})