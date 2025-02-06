import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { app } from '@todo-node/app';
import { env } from '@todo-node/env';
import * as init from '@todo-node/init';

const start = () => {
  if (env.__DEV__) {
    return init.local(app);
  } else {
    return init.aws(app);
  }
};

export const handler = start();
