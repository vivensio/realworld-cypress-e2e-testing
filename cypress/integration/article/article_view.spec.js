import {
  ARTICLE_TITLE,
  ARTICLE_BODY,
  ARTICLE_TAG,
} from '../../support/constants';
import { deleteAllArticles, getAllArticles, postArticle } from '../../support/utils';

describe('Article Page', () => {
  beforeEach(() => {
    cy.login('test123@test.com', 'test123')
      .then(deleteAllArticles)
      .then(postArticle);
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

  context('delete article', () => {
    it('deletes article successfully', () => {
      cy.get('[data-cy="article-delete-btn"]').eq(0).click();
      getAllArticles()
        .should('have.length', 0);
    });
  });
});
