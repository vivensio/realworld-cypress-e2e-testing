import {
  ARTICLE_BODY,
  ARTICLE_DESCRIPTION,
  ARTICLE_TAG,
  ARTICLE_TITLE,
} from './constants';

export const getRequestParams = (method, route) => ({
  method,
  url: `${Cypress.config().apiBaseUrl}${route}`,
  headers: {
    Authorization: `Token ${window.localStorage.getItem('id_token')}`,
  },
});

export const getAllArticles = () => {
  const params = getRequestParams('GET', '/articles?offset=0&limit=100');
  return cy.request({ ...params }).its('body.articles');
};

export const deleteArticle = (id) => {
  const params = getRequestParams('DELETE', `/articles/${id}`);
  return cy.request({ ...params });
};

export const deleteAllArticles = () => (
  getAllArticles()
    .then((articles) => {
      articles.forEach(article => deleteArticle(article.slug));
    })
);

export const postArticle = () => {
  const params = getRequestParams('POST', '/articles');
  cy.request({
    ...params,
    body: {
      article: {
        author: {},
        body: ARTICLE_BODY,
        description: ARTICLE_DESCRIPTION,
        title: ARTICLE_TITLE,
        tagList: [ARTICLE_TAG],
      },
    },
  });
};
