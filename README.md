# Simple Todo app backend written in typescript

Works with `Todo` models as:

```ts
type Todo = {
  id: string;
  message: string;
  done: boolean;
};
```

## Following apis to manage

Get all Todos (list)

```sh
curl --request GET \
  --url http://localhost:4500/api/todo
```

Get one Todo by id

```sh
curl --request GET \
  --url http://localhost:4500/api/todo/'{ID}'
```

Create a new Todo

```sh
curl --request POST \
  --url http://localhost:4500/api/todo \
  --header 'Content-Type: application/json' \
  --data '{ "message": "Todo app", "done": false }'
```

Remove a Todo

```sh
curl --request DELETE \
  --url http://localhost:4500/api/todo/'{ID}'
```

Update a Todo

```sh
curl --request PUT \
  --url http://localhost:4500/api/todo/'{ID}' \
  --header 'Content-Type: application/json' \
  --data '{ "message": "Todo modified", "done": true }'
```
