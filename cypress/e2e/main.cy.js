describe('Functional on dashboard main page', () => {
    beforeEach('acces to main page', () => {
        cy.visit('/')
        
    })
  
    it('Verify Homepage Loads Successfully', () => {
      cy.get("app-price-filter").should("contain","Price Filter")
      cy.get("mat-list-item").should("have.length", 6)
      cy.get("mat-list-item").eq(0).should("contain", "All Categories")
      cy.get("app-book-card").should("have.length",45)
      cy.get("mat-toolbar span.mdc-button__label").should("have.length",4)
      cy.get("mat-toolbar span.mdc-button__label").eq(1).contains("Login")
      cy.get("mat-toolbar app-search input").should("have.attr","placeholder", "Search books or authors")
      
    })
  
    it('Verify Header Section Elements', () => {
        cy.get("mat-toolbar-row div").should("have.length",3)
        cy.get("mat-toolbar-row div span.mdc-button__label").contains("Book Cart")
        cy.get("mat-toolbar app-search input").should("have.attr","placeholder", "Search books or authors")
        cy.get("mat-toolbar mat-icon").should("have.length",2)
        cy.get("mat-toolbar mat-icon").eq(1).contains("shopping_cart")
        cy.get("mat-toolbar span.mdc-button__label").should("have.length",4)
        cy.get("mat-toolbar span.mdc-button__label").eq(1).contains("Login")
      
    })
  
    it('Verify Book Listings Display Correctly', () => {
        cy.get("mat-list-item").should("have.length", 6)
        cy.get("mat-list-item").eq(0).should("contain", "All Categories")
        cy.get("app-book-card").should("have.length",45)
        cy.get("app-book-card mat-card").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("mat-list-item").eq(2).should("contain", "Fiction").click()
        cy.get("app-book-card").should("have.length",10)
        cy.get("app-book-card mat-card").eq(3).contains("A Princess in Theory: Reluctant Royals")
      
    })
  
    it('Verify Search Functionality (Valid Keyword)', () => {
        cy.get("mat-toolbar app-search input").type("ministry")
        cy.get("#mat-autocomplete-0").click()
        cy.get("app-book-card mat-card").eq(0).contains("The Ministry of Truth: The Biography of George Orwell's \"1984\"")
        cy.get("#mat-autocomplete-0").contains("The Ministry of Truth: The Biography of George Orwell's \"1984\"")
      
    })
  
    it('Verify Search Functionality (Invalid Keyword)', () => {
        cy.get("mat-toolbar app-search input").type("get start")
        cy.get("app-book-card").should("have.length",45)
      
    })
  
    it('Verify "Add to Cart" Functionality', () => {
        cy.get("app-book-card").should("have.length",45)
        cy.get("app-book-card mat-card").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
        cy.get("app-book-card mat-card app-addtocart").eq(1).click()
        cy.get("mat-toolbar mat-icon").eq(1).contains("shopping_cart").click()
        cy.get("mat-card-content tbody td.mat-mdc-cell").eq(1).contains("Harry Potter and the Prisoner of Azkaban")
      
    })
  
    it('Verify Book Details Page Navigation', () => {
      
    })
  
    it('Verify Login/Register Navigation Links', () => {
      
    })
  
    it('Verify Cart Icon Navigation', () => {
      
    })
  
    it('Verify Featured Books Section (If Applicable)', () => {
      
    })
  
  })