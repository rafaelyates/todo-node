import { v4 as uuid } from 'uuid';
import { Router } from 'express';

import { memoryDataBase } from './db';
import { Todo } from './models';

const todoRoutes = Router();

todoRoutes.get('/todo/list', (req, res) => {
  return res.status(200).json(memoryDataBase.todoList);
});

todoRoutes.post('/todo/create', (req, res) => {
  const newTodo: Todo = { ...req.body, id: uuid() };
  memoryDataBase.todoList = [...memoryDataBase.todoList, newTodo];

  return res.status(200).json(newTodo);
});

todoRoutes.delete('/todo/remove/:id', (req, res) => {
  memoryDataBase.todoList = memoryDataBase.todoList.filter(({ id }) => id !== req.params.id);

  return res.status(204).send();
});

todoRoutes.put('/todo/update/:id', (req, res) => {
  memoryDataBase.todoList = memoryDataBase.todoList.map((todo) => {
    return todo.id === req.params.id ? { ...todo, ...req.body, id: todo.id } : todo;
  });

  return res.status(204).send();
});

export default todoRoutes;
