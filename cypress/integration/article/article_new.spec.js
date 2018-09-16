import {
  ARTICLE_TITLE,
  ARTICLE_DESCRIPTION,
  ARTICLE_BODY,
  ARTICLE_TAG,
  ARTICLE_TAGS,
} from '../../support/constants';

describe('New Article Page', () => {
  beforeEach(() => {
    cy.login('test123@test.com', 'test123');
    cy.visit('/editor');
  });

  context('Tags', () => {
    it('adds tags', () => {
      ARTICLE_TAGS.forEach((tag) => {
        cy.get('[data-cy="article-tags-input"]').type(`${tag}{enter}`);
        cy.get('[data-cy="article-tags"]').should('contain', tag);
      });

      cy.get('[data-cy="article-tags"]').should('have.length', ARTICLE_TAGS.length);
    });

    it('removes tags', () => {
      ARTICLE_TAGS.forEach((tag) => {
        cy.get('[data-cy="article-tags-input"]').type(`${tag}{enter}`);
      });

      cy.get('[data-cy="article-tags"]').each(($el) => {
        $el.find('[data-cy="article-tag-remove"]').click();
      });

      cy.get('[data-cy="article-tags"]').should('have.length', 0);
    });
  });

  context('New Article', () => {
    it('posts a new article', () => {
      cy.get('[data-cy="article-title"]').type(ARTICLE_TITLE);
      cy.get('[data-cy="article-description"]').type(ARTICLE_DESCRIPTION);
      cy.get('[data-cy="article-body"]').type(ARTICLE_BODY);
      cy.get('[data-cy="article-tags-input"]').type(`${ARTICLE_TAG}{enter}`);

      cy.get('[data-cy="article-form"]').submit();
      cy.get('[data-cy="article-title"]').should('have.text', ARTICLE_TITLE);
    });
  });
});
