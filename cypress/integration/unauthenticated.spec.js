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
});
