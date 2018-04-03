import { EndpointDefinition } from '../../../../src/shared';
import { HasId } from '../../models/hasId';
import { Todo, UpdatableTodoFields } from '../../models/todo';

export const updateTodo = new EndpointDefinition<HasId, UpdatableTodoFields, Todo>('PUT', '/todos/:id');