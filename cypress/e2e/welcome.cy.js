describe('home dashboard', () => {
  it('passes test on homepage', () => {
    cy.visit('/')
    cy.get("app-price-filter").should("contain","Price Filter")
    cy.get("mat-list-item").should("have.length", 6)
    cy.get("mat-list-item").eq(0).should("contain", "All Categories")
    cy.get("app-book-card").should("have.length",45)
  })
})