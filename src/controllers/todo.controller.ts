import { isUUID } from 'class-validator';
import { type Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  request,
  requestBody,
} from 'inversify-express-utils';
import { v4 as uuid } from 'uuid';

import { DatabaseTypes } from '@todo-node/constants';
import { Todo } from '@todo-node/models';
import * as doc from './todo.controller-doc';

@doc.todoControllerDoc()
@controller('/todo')
export class TodoController extends BaseHttpController implements interfaces.Controller {
  readonly #memoryDataBase;

  constructor(@inject(DatabaseTypes.MEMORY) memoryDataBase: Map<string, Todo>) {
    super();
    this.#memoryDataBase = memoryDataBase;
  }

  @doc.getListOfTodoItemsDoc()
  @httpGet('/')
  async getListOfTodoItems() {
    const listOfTodos = Array.from(this.#memoryDataBase.values());

    return this.json(
      listOfTodos.map((todo) => todo.serialized),
      StatusCodes.OK,
    );
  }

  @doc.getOneTodoDoc()
  @httpGet('/:id')
  async getOneTodo(@request() req: Request) {
    const {
      params: { id },
    } = req;

    if (!id) {
      return this.badRequest();
    }

    const todo = this.#memoryDataBase.get(id);

    if (!todo) {
      return this.notFound();
    }

    return this.json(todo.serialized, StatusCodes.OK);
  }

  @doc.createNewTodoDoc()
  @httpPost('/')
  async createNewTodo(@requestBody() body: object) {
    const id = uuid();

    const previous = this.#memoryDataBase.get(id);
    if (previous) {
      return this.conflict();
    }

    const todo = Todo.from({ ...body, id });

    try {
      await todo.validate();
      this.#memoryDataBase.set(id, todo);
      return this.json(todo.serialized, StatusCodes.OK);
    } catch (error) {
      return this.json({ reason: 'Could not create todo!', cause: error }, StatusCodes.BAD_REQUEST);
    }
  }

  @doc.updateOneTodoDoc()
  @httpPut('/:id')
  async updateOneTodo(@request() req: Request, @requestBody() body: object) {
    const {
      params: { id },
    } = req;

    if (!id || !isUUID(id)) {
      return this.badRequest('Invalid UUID as path parameter');
    }

    const previous = this.#memoryDataBase.get(id);

    if (!previous) {
      return this.notFound();
    }

    try {
      const updated = Todo.from({ ...previous, ...body, id });
      await updated.validate();
      this.#memoryDataBase.set(id, updated);

      return this.json(updated.serialized, StatusCodes.OK);
    } catch (error) {
      return this.json({ reason: `Could not update todo ${id}`, cause: error }, StatusCodes.BAD_REQUEST);
    }
  }

  @doc.removeOneTodoDoc()
  @httpDelete('/:id')
  async removeOneTodo(@request() req: Request) {
    const {
      params: { id },
    } = req;

    if (!id || !isUUID(id)) {
      return this.badRequest('Invalid UUID as path parameter');
    }

    const success = this.#memoryDataBase.delete(id);

    if (!success) {
      return this.notFound();
    }

    return this.statusCode(StatusCodes.NO_CONTENT);
  }
}
