class RegisterPage {
    elements= {
        usernameInput: ()=> cy.get("#mat-input-2"),
        passwordInput: ()=> cy.get("#mat-input-3"),
        repasswordInput: ()=> cy.get("#mat-input-4"),
        registerBUtton : ()=> cy.contains('button', 'Register')
        
    }

    visit(){
        cy.visit('/register')
    }

    typeUsername(username){
        this.elements.usernameInput().type(username, { log: false })
    }
    typePassword(password){
        this.elements.passwordInput().type(password, { log: false })
    }

    typeREPassword(repassword){
        this.elements.repasswordInput().type(repassword, { log: false })
    }


    clickLogin(register){
        this.elements.registerBUtton().click
    }

}

export default RegisterPage