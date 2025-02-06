import { StatusCodes } from 'http-status-codes';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from 'openapi-metadata/decorators';

import { Todo } from '@todo-node/models';

export function todoControllerDoc() {
  return (target: Object, propertyKey?: string | symbol) => {
    [ApiTags('todo')].forEach((fn) => fn(target, propertyKey));
  };
}

export function getListOfTodoItemsDoc() {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    [
      ApiOperation({
        methods: ['get'],
        path: '/todo',
        summary: 'Returns a list of todo items',
      }),
      ApiResponse({
        type: [Todo],
        status: StatusCodes.OK,
        description: 'A list of todo items',
      }),
    ].forEach((fn) => fn(target, propertyKey, descriptor));
  };
}

export function getOneTodoDoc() {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    [
      ApiOperation({
        methods: ['get'],
        path: '/todo/{id}',
        summary: 'Returns a given todo by its id',
      }),
      ApiParam({
        name: 'id',
        type: String,
        example: 'c1b198eb-9a12-4981-8906-300a68693f00',
        required: true,
      }),
      ApiResponse({
        type: Todo,
        status: StatusCodes.OK,
        description: 'A todo item',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.BAD_REQUEST,
        description: 'When an invalid ID has been used as path parameter',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.NOT_FOUND,
        description: 'When the todo item with the given ID has not been found',
      }),
    ].forEach((fn) => fn(target, propertyKey, descriptor));
  };
}

export function createNewTodoDoc() {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    [
      ApiOperation({
        methods: ['post'],
        path: '/todo',
        summary: 'Creates a new todo item',
      }),
      ApiBody({
        type: Todo,
        required: true,
      }),
      ApiResponse({
        type: Todo,
        status: StatusCodes.OK,
        description: 'A todo item',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.BAD_REQUEST,
        description: 'When an invalid todo item has been used as body',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.CONFLICT,
        description: 'When a todo item with the generated id already exists',
      }),
    ].forEach((fn) => fn(target, propertyKey, descriptor));
  };
}

export function updateOneTodoDoc() {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    [
      ApiOperation({
        methods: ['put'],
        path: '/todo/{id}',
        summary: 'Updates a given todo by its id',
      }),
      ApiParam({
        name: 'id',
        type: String,
        example: 'c1b198eb-9a12-4981-8906-300a68693f00',
        required: true,
      }),
      ApiBody({
        type: Todo,
        required: true,
      }),
      ApiResponse({
        type: Todo,
        status: StatusCodes.OK,
        description: 'A todo item',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.BAD_REQUEST,
        description: 'When an invalid ID has been used as path parameter or invalid todo item has been used as body',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.NOT_FOUND,
        description: 'When the todo item with the given ID has not been found',
      }),
    ].forEach((fn) => fn(target, propertyKey, descriptor));
  };
}

export function removeOneTodoDoc() {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    [
      ApiOperation({
        methods: ['delete'],
        path: '/todo/{id}',
        summary: 'Deletes a given todo by its id',
      }),
      ApiParam({
        name: 'id',
        type: String,
        example: 'c1b198eb-9a12-4981-8906-300a68693f00',
        required: true,
      }),
      ApiResponse({
        status: StatusCodes.NO_CONTENT,
        description: 'When the given todo item has been removed',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.BAD_REQUEST,
        description: 'When an invalid ID has been used as path parameter',
      }),
      ApiResponse({
        type: String,
        mediaType: 'text/plain',
        status: StatusCodes.NOT_FOUND,
        description: 'When the todo item with the given ID has not been found',
      }),
    ].forEach((fn) => fn(target, propertyKey, descriptor));
  };
}
