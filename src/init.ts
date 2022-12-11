import http from 'http';
import serverlessExpress from '@vendia/serverless-express';

import type { Express } from 'express';
import type { APIGatewayEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';

export function initLocal(app: Express) {
  const port: string = process.env.PORT ?? '4500';
  const host: string = process.env.HOST ?? 'localhost';

  const expressInstance = http.createServer(app);

  return expressInstance.listen(parseInt(port, 10), host, () => {
    console.log(`server running on -> http://${host}:${port}`);
  });
}

export function initAWS(app: Express) {
  const serverlessExpressInstance = serverlessExpress({ app });

  return async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    return serverlessExpressInstance(event, context, callback);
  };
}
