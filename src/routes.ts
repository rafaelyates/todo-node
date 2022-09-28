import { Router } from 'express';

import * as controllers from '@todo-node/controllers';

export default Router()
  .get('/todo', controllers.getListOfTodos)
  .get('/todo/:id', controllers.getOneTodo)
  .post('/todo', controllers.createNewTodo)
  .put('/todo/:id', controllers.updateOneTodo)
  .delete('/todo/:id', controllers.removeOneTodo);
