describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/#/register');
  });

  it('has a link to sign in page', () => {
    cy.contains('Have an account?').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/login`);
  });

  context('validates the registration form', () => {
    beforeEach(() => {
      cy.get('[data-cy=input-username]').type('batman');
      cy.get('[data-cy=input-email]').type('bat@man.codes');
      cy.get('[data-cy=input-password]').type('batman123');
    });

    it('triggers form validation errrors for username', () => {
      cy.get('[data-cy=input-username]').clear();
      cy.get('[data-cy=form-register]').submit();
      cy.get('[data-cy=error-messages]').should('contain', 'username can\'t be blank');
    });

    it('triggers form validation errors for email', () => {
      cy.get('[data-cy=input-email]').clear();
      cy.get('[data-cy=form-register]').submit();
      cy.get('[data-cy=error-messages]').should('contain', 'email can\'t be blank');

      cy.get('[data-cy=input-email]').type('notanEmail');
      cy.get('[data-cy=form-register]').submit();
      cy.get('[data-cy=error-messages]').should('contain', 'email is invalid');
    });
  });
});
