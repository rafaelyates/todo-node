import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { docs } from '@todo-node/document';
import { env } from '@todo-node/env';
import * as modules from '@todo-node/modules';

const container = new Container({ autoBindInjectable: true });
container.load(modules.databaseModule);
container.load(modules.controllersModule);

const envCors = (): express.RequestHandler => {
  if (env.__DEV__) {
    return cors();
  } else {
    return (req, res, next) => next();
  }
};

const server = new InversifyExpressServer(
  container,
  express.Router({ caseSensitive: false, mergeParams: false, strict: false }),
  { rootPath: '/api' },
  express()
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json({ strict: true }))
    .use(compression())
    .use(helmet())
    .use(docs({ docsPath: '/api-docs' }))
    .use(envCors()),
);

export const app = server.build();
