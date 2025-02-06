import { ContainerModule } from 'inversify';

import { TodoController } from '@todo-node/controllers';

export const controllersModule = new ContainerModule((bind) => {
  bind(TodoController).toSelf().inSingletonScope();
});
