import { v4 as uuid } from 'uuid';

import { memoryDataBase } from '@todo-node/db';

import type { Request, Response } from 'express';
import type { Todo } from '@todo-node/models';

export function getListOfTodos(req: Request, res: Response): void {
  const listOfTodos = Array.from(memoryDataBase.values());
  res.status(200).json(listOfTodos);
}

export function getOneTodo(req: Request, res: Response): void {
  const todo = memoryDataBase.get(req.params.id);

  if (!todo) {
    res.status(204).send();
    return;
  }

  res.status(200).json(todo);
}

export function createNewTodo(req: Request, res: Response): void {
  const id = uuid();
  const todo: Todo = { ...req.body, id };

  memoryDataBase.set(id, todo);
  res.status(200).json(todo);
}

export function removeOneTodo(req: Request, res: Response): void {
  memoryDataBase.delete(req.params.id);
  res.status(204).send();
}

export function updateOneTodo(req: Request, res: Response): void {
  const previous = memoryDataBase.get(req.params.id);

  if (!previous) {
    res.status(204).send();
    return;
  }

  const updated: Todo = { ...previous, ...req.body, id: req.params.id };
  memoryDataBase.set(req.params.id, updated);
  res.status(200).json(updated);
}
