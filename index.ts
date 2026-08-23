import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();


app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});