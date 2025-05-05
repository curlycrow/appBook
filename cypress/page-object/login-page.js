
class LoginPage{
    
    elements ={
        usernameInput: ()=> cy.get('#mat-input-0'),
        passwordInput: ()=> cy.get('#mat-input-1'),
        loginBUtton : ()=> cy.get(".mdc-button__label").filter(':contains("Login")').eq(1),
    }

    visit(){
        cy.visit('/login')
    }

    typeUsername(username){
        this.elements.usernameInput().type(username)
    }
    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    clickLogin(login){
        this.elements.loginBUtton().click()
    }
}

export default LoginPage