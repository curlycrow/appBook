describe('Functional on dashboard main page', () => {
    beforeEach('acces to main page', () => {
        cy.visit('/')
        
    })
  
    it.only('Verify Homepage Loads Successfully', () => {
      cy.get("app-price-filter").should("contain","Price Filter")
      cy.get("mat-list-item").should("have.length", 6)
      cy.get("mat-list-item").eq(0).should("contain", "All Categories")
      cy.get("app-book-card").should("have.length",45)
      cy.get("mat-toolbar span.mdc-button__label").should("have.length",4)
      cy.get("mat-toolbar span.mdc-button__label").eq(1).contains("Login")
      cy.get("mat-toolbar app-search input").should("have.attr","placeholder", "Search books or authors")
      
    })
  
    it.skip('Verify Header Section Elements', () => {
      
    })
  
    it('Verify Book Listings Display Correctly', () => {
      
    })
  
    it('Verify Search Functionality (Valid Keyword)', () => {
      
    })
  
    it('Verify Search Functionality (Invalid Keyword)', () => {
      
    })
  
    it('Verify "Add to Cart" Functionality', () => {
      
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