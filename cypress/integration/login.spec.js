import { resetDatabase } from '../support/utils';

const { batman } = Cypress.env().users;

context('Login Page', () => {
  before(resetDatabase);
  beforeEach(() => {
    cy.visit('/login');
  });

  it('has a link to the registration page', () => {
    cy.contains('Need an account?').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/register`);
  });

  it('logs user in successfully', () => {
    cy.get('[data-cy=input-email]').type(batman.email);
    cy.get('[data-cy=input-password]').type(batman.password);
    cy.get('[data-cy=form-login]').submit();

    // Check if we're redirected to homepage
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Make sure that we're really logged in by checking existence of elements in Navbar
    cy.get('.nav-item').should('contain', 'Settings');
    cy.get('.nav-item').should('contain', batman.username);
  });
});
