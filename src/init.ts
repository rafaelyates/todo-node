import serverlessExpress from '@codegenie/serverless-express';
import { type APIGatewayEvent, type APIGatewayProxyCallback, type Context } from 'aws-lambda';
import { type Application } from 'express';
import http from 'node:http';

export const local = (app: Application) => {
  const port: string = process.env.PORT ?? '4500';
  const host: string = process.env.HOST ?? 'localhost';

  const expressInstance = http.createServer(app);

  return expressInstance.listen(parseInt(port, 10), host, () => {
    console.log(`server running on -> http://${host}:${port}`);
  });
};

export const aws = (app: Application) => {
  const serverlessExpressInstance = serverlessExpress({ app });

  return async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    return serverlessExpressInstance(event, context, callback);
  };
};
