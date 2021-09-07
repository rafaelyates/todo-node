import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import http from 'http';

import routes from './routes';

dotenv.config();

const app = express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({ strict: true }))
  .use(compression())
  .use(cors());

app.use('/api', routes);

const port: string = process.env.PORT ?? '4500';
const host: string = process.env.HOST ?? 'localhost';

http.createServer(app).listen(parseInt(port, 10), host, () => {
  console.log(`server running on -> http://${host}:${port}`);
});
