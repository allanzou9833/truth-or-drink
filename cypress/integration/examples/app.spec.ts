describe('App Component', () => {
  it('should display welcome message', () => {
    cy.visit('');
    cy.get('app-root h1').contains('Welcome to truth-or-drink!');
  })
})