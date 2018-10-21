Cypress.Commands.add('login', ({ email, password }) => (
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    body: {
      user: {
        email,
        password,
      },
    },
  }).then((response) => {
    window.localStorage.setItem('id_token', response.body.user.token);
  })
));

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.__store__.dispatch('logout'); // eslint-disable-line no-underscore-dangle
  });
});
