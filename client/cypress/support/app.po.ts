export class AppPage {
  public static goToPage() {
    cy.visit('');
  }

  public static checkTitleText() {
    cy.get('app-root h1').should('have.text', ' Welcome to truth-or-drink! ');
  }
}