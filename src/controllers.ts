import { v4 as uuid } from 'uuid';
import type { Request, Response } from 'express';

import { memoryDataBase } from '@todo-node/db';
import type { Todo } from '@todo-node/models';

export const getListOfTodos = (req: Request, res: Response): void => {
  const listOfTodos = Array.from(memoryDataBase.todoMap.values());
  res.status(200).json(listOfTodos);
};

export const getOneTodo = (req: Request, res: Response): void => {
  const todo = memoryDataBase.todoMap.get(req.params.id);

  if (!todo) {
    res.status(204).send();
    return;
  }

  res.status(200).json(todo);
};

export const createNewTodo = (req: Request, res: Response): void => {
  const id = uuid();
  const todo: Todo = { ...req.body, id };

  memoryDataBase.todoMap.set(id, todo);
  res.status(200).json(todo);
};

export const removeOneTodo = (req: Request, res: Response): void => {
  memoryDataBase.todoMap.delete(req.params.id);
  res.status(204).send();
};

export const updateOneTodo = (req: Request, res: Response): void => {
  const previous = memoryDataBase.todoMap.get(req.params.id);

  if (!previous) {
    res.status(204).send();
    return;
  }

  const updated: Todo = { ...previous, ...req.body, id: req.params.id };
  memoryDataBase.todoMap.set(req.params.id, updated);
  res.status(200).json(updated);
};
