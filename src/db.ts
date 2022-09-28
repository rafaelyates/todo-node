import type { Todo } from '@todo-node/models';

export const memoryDataBase = {
  todoMap: new Map<string, Todo>(),
} as const;
