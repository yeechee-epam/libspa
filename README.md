# Libray application's frontend

## Set Up and Run the Angular Project

Install the project dependencies:

```bash
npm install
```

The compatible API server runs on `http://localhost:6060` by default. As such, to connect your Angular application with that API server, create a `.env` file under the root project directory and populate it with the following environment variables:
API_SERVER_URL=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CALLBACK_URL=
AUTH0_AUDIENCE=


```bash
API_SERVER_URL=http://localhost:6060
```

Next, execute the following command to run the JSON server API:

```bash
npm run api
```

Finally, open another terminal tab and execute this command to run your Angular application:

```bash
npm start
```

Visit [`http://localhost:4040/`](http://localhost:4040/) to access the starter application.

