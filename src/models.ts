export type Todo = {
  id?: string,
  message: string,
};

export type MemoryDatabase = {
  todoList: Todo[];
}
