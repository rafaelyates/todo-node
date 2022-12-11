import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import routes from '@todo-node/routes';
import { initAWS, initLocal } from '@todo-node/init';

dotenv.config();

const app = express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({ strict: true }))
  .use(compression())
  .use(cors())
  .use('/api', routes);

const isDevelopment = process.env.NODE_ENV === 'development';

export default isDevelopment ? initLocal(app) : initAWS(app);
