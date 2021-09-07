export type Todo = {
  id?: string;
  message: string;
  done: boolean;
};

export type MemoryDatabase = {
  todoList: Todo[];
};
