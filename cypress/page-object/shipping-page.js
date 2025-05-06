class ShippingPage{

    elements ={
        
        nameInput:()=>cy.get('#mat-input-2'),
        address1inpuT: ()=>cy.get("#mat-input-3"),
        address2inpuT: ()=>cy.get("#mat-input-4"),
        pincodeInput:  ()=>cy.get("#mat-input-5"),
        stateInput: ()=>cy.get("#mat-input-6"),
        orderButton: ()=>cy.get("")
    }

    visit(){
        cy.visit('/checkout')
    }

    typeName(name){
        this.elements.nameInput().type(name)
    }

    typeAddress1(addressLine1){
        this.elements.address1inpuT().type(addressLine1)

    }

    typeAddress2(addressLine2){
        this.elements.address2inpuT().type(addressLine2)
        
    }

    typepincode(pincode){
        this.elements.pincodeInput().type(pincode)

    }

    typestate(state){
        this.elements.stateInput().type(state)

    }

    clickOrder(order){
        this.elements.orderButton().click()

    }
}

export default ShippingPage