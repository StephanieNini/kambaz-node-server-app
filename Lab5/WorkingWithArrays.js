let todos = [
  { id: 1, title: "Task 1", completed: false, description: "desc 1" },
  { id: 2, title: "Task 2", completed: true, description: "desc 2" },
  { id: 3, title: "Task 3", completed: false, description: "desc 3" },
  { id: 4, title: "Task 4", completed: true, description: "desc 4" },
];

export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "",
    };
    todos.push(newTodo);
    res.json(todos);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id !== parseInt(id));
    res.json(todos);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  };

  // ✅ ON YOUR OWN: update completed
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed === "true";
    res.json(todos);
  };

  // ✅ ON YOUR OWN: update description
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  };

    const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  const updateTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    return;
    }

  todos = todos.map((t) => {
    if (t.id === parseInt(id)) {
      return { ...t, ...req.body }; // 合并更新
    }
    return t;
  });
  res.sendStatus(200); // ✅ 不再返回数组
};

app.put("/lab5/todos/:id", updateTodo);

  app.delete("/lab5/todos/:id", deleteTodo);

  // ✅ REGISTER ROUTES
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.post("/lab5/todos", createNewTodo);
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/create", createNewTodo);

}
