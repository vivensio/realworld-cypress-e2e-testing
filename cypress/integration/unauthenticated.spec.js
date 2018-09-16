context('Unauthenticated App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('checks for the home page', () => {
    cy.get('h1.logo-font')
      .should('have.text', 'conduit');
  });

  it('navbar should have Home, Sign in and Sign up links', () => {
    cy.get('nav')
      .should('contain', 'Home')
      .should('contain', 'Sign in')
      .should('contain', 'Sign up');
  });

  it('should navigate to Sign in page', () => {
    cy.contains('Sign in').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });

  it('should navigate to Sign up page', () => {
    cy.contains('Sign up').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/register`);
  });
});
