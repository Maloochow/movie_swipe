## Overview

Real-time vote application that finds common ground of your group’s movie preferences.

1. Utilized Socket.io as the websocket interface to stream real-time data to the React-based frontend
2. Authenticated users through Rails RESTful API via ActiveRecordStore
3. Designed user experience with Bootstrap’s responsive styling and various browser events
4. Complemented with full suite integration testing and unit testing on separate dev environment

## Instruction

### `frontend`

In the `frontend` directory, you can:

- Run `yarn start` to run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- Run `yarn run server` to start the server side in the development mode ([http://localhost:3001](http://localhost:3001)). It is written in Node.js and supports the real-time communication between different clients.

- Run `yarn test` to launch the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `backend`

In the `backend` directory, you can run:

- Run `rails s` to start the Rails API in the development mode. Open [http://localhost:8080](http://localhost:8080) to view it in the browser. This API supports the user authentication of the app.
