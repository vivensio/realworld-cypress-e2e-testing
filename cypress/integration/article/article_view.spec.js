import {
  ARTICLE_TITLE,
  ARTICLE_BODY,
  ARTICLE_TAG,
  COMMENT,
} from '../../support/constants';
import { deleteAllArticles, getAllArticles, postArticle } from '../../support/utils';

const setup = () => {
  cy.login('test123@test.com', 'test123')
    .then(deleteAllArticles)
    .then(postArticle);
  cy.visit('/@test123');
  cy.get('[data-cy="article-title"]').click();
};

describe('Article Page', () => {
  beforeEach(setup);

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

describe('Article Page - as another user', () => {
  before(() => {
    setup();
    cy.logout();
    cy.login('test1234@test.com', 'test1234');
    cy.reload();
  });

  context('Article actions', () => {
    it('can post a comment on an article', () => {
      cy.get('[data-cy="comment-textbox"]').type(COMMENT, { delay: 100 });
      cy.get('[data-cy="post-comment-btn"]').click();
      cy.get('[data-cy="comment-body"]').should('contain', COMMENT);
    });

    it.only('can favorite/unfavorite an article', () => {
      cy.get('[data-cy="fav-unfav-btn"]').eq(0).should('contain', 'Favorite Article');

      cy.get('[data-cy="fav-unfav-btn"]').eq(0).click();

      cy.get('[data-cy="fav-unfav-btn"]').eq(0).should('contain', 'Unfavorite Article');
      cy.get('[data-cy="fav-counter"]').should('contain', '(1)');

      cy.get('[data-cy="fav-unfav-btn"]').eq(0).click();

      cy.get('[data-cy="fav-unfav-btn"]').eq(0).should('contain', 'Favorite Article');
      cy.get('[data-cy="fav-counter"]').should('contain', '(0)');
    });
  });

  after(() => {
    cy.login('test123@test.com', 'test123')
      .then(deleteAllArticles);
  });
});
