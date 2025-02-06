import { ContainerModule } from 'inversify';

import { DatabaseTypes } from '@todo-node/constants';

export const databaseModule = new ContainerModule((bind) => {
  bind(DatabaseTypes.MEMORY).toConstantValue(new Map());
});
