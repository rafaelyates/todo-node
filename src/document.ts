import express from 'express';
import { generateDocument } from 'openapi-metadata';
import swaggerUi, { type SwaggerUiOptions } from 'swagger-ui-express';

import * as controllers from '@todo-node/controllers';

const swaggerDocument = await generateDocument({
  controllers: Object.values(controllers),
  document: {
    info: {
      title: 'Todo server',
      version: '1.0.0',
    },
  },
});

type DocsParam = {
  readonly docsPath: string;
};

export const docs = ({ docsPath }: DocsParam): express.Router => {
  const swaggerPath = `${docsPath}/swagger.json`;

  const options = {
    swaggerOptions: {
      url: swaggerPath,
    },
  } as const satisfies SwaggerUiOptions;

  return express
    .Router({ caseSensitive: false, mergeParams: false, strict: false })
    .get(swaggerPath, async (req, res) => res.json(swaggerDocument))
    .use(docsPath, swaggerUi.serve)
    .get(docsPath, swaggerUi.setup(swaggerDocument, options));
};
