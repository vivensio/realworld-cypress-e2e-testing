# realworld-cypress-e2e-testing 🛡

This is a repo for e2e tests for [realworld](https://github.com/gothinkster/realworld) application. To run these tests, we need to have realworld backend and frontend running locally.

## Instructions

1. BACKEND
- Clone [node-express-realworld-example-app](https://github.com/vivensio/node-express-realworld-example-app)
- Run `mongod` - You can use MongoDB Community edition.
- In another terminal, run `yarn run test:cy` - the express server should be up and running on port 3001.

2. FRONTEND
- Clone [vue-realworld-example-app](https://github.com/vivensio/vue-realworld-example-app)
- Run `npm run dev`
- The app should now be running on port 8081

3. Run tests
- Clone this repo and run `npm run e2e:open`
