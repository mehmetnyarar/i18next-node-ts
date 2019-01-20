# i18next with Node and TypeScript

The repo was created to demonstrate the problem mentioned [here](https://github.com/i18next/i18next/issues/1177).

Express configuration where the problem occurs can be found in `src/server/app.ts` file:

- Line 4: `import` statement
- Line 35: `require` statement

```
$ npm install
$ npm run watch
```

Example `.env`

```
SERVER_HOST=127.0.0.1
SERVER_PORT=5000
CORS_WHITE_LIST=http://localhost:3000
```