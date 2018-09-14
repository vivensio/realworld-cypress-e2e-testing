context('Log in', () => {
  it('logs user in', () => {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.get('[data-cy=input-email]').type('test123@test.com');
    cy.get('[data-cy=input-password]').type('test123');
    cy.get('[data-cy=form-login]').submit();

    // Check if we're redirected to homepage
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);

    // Make sure that we're really logged in by checking existence of elements in Navbar
    cy.get('.nav-item').should('contain', 'Settings');
    cy.get('.nav-item').should('contain', 'test123');
  });
});
