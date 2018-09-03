context('Log in', () => {
  it('logs user in', () => {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.get('[data-cy=input-email]').type('test123@test.com');
    cy.get('[data-cy=input-password]').type('test123');
    cy.get('[data-cy=form-login]').submit();

    cy.get('.nav-item').should('contain', 'Settings');
    cy.get('.nav-item').should('contain', 'test123');
  });
});
