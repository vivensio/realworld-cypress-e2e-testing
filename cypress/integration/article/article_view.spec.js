import {
  ARTICLE_TITLE,
  ARTICLE_BODY,
  ARTICLE_TAG,
} from './constants';

describe('Article Page', () => {
  beforeEach(() => {
    cy.login('test123@test.com', 'test123');
    cy.visit('/@test123');

    cy.get('[data-cy="article-title"]').click();
  });

  context('view article', () => {
    it('has article title, description and tags in proper places', () => {
      cy.get('[data-cy="article-title"]').should('have.text', ARTICLE_TITLE);
      cy.get('[data-cy="article-body"]').should('contain', ARTICLE_BODY);
      cy.get('[data-cy="article-tag"]').should('contain', ARTICLE_TAG);
    });
  });
});
