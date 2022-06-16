import { v4 as uuid } from 'uuid';
import { Router } from 'express';

import { memoryDataBase } from '@todo-node/db';
import type { Todo } from '@todo-node/models';

const todoRoutes = Router();

todoRoutes.get('/todo/list', (req, res) => {
  const todoList = Array.from(memoryDataBase.todoMap.values());

  return res.status(200).json(todoList);
});

todoRoutes.post('/todo/create', (req, res) => {
  const id = uuid();
  const newTodo: Todo = { ...req.body, id };

  memoryDataBase.todoMap.set(id, newTodo);

  return res.status(200).json(newTodo);
});

todoRoutes.delete('/todo/remove/:id', (req, res) => {
  memoryDataBase.todoMap.delete(req.params.id);

  return res.status(204).send();
});

todoRoutes.put('/todo/update/:id', (req, res) => {
  const previous = memoryDataBase.todoMap.get(req.params.id);

  if (previous) {
    memoryDataBase.todoMap.set(req.params.id, {
      ...previous,
      ...req.body,
      id: req.params.id,
    });
  }

  return res.status(204).send();
});

export default todoRoutes;
