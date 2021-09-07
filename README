# Simple Todo app backend written in typescript

Works with `Todo` models as:

```ts
type Todo = {
  id?: string;
  message: string;
  done: boolean;
};
```

## Following apis to manage

Get all Todo list

```sh
curl --request GET \
  --url http://localhost:4500/api/todo/list
```

Create a new Todo

```sh
curl --request POST \
  --url http://localhost:4500/api/todo/create \
  --header 'Content-Type: application/json' \
  --data '{ "message": "Todo app", "done": false }'
```

Remove a Todo

```sh
curl --request DELETE \
  --url http://localhost:4500/api/todo/remove/'{ID}'
```

Update a Todo

```sh
curl --request PUT \
  --url http://localhost:4500/api/todo/update/'{ID}' \
  --header 'Content-Type: application/json' \
  --data '{ "message": "Todo modified", "done": true }'
```
