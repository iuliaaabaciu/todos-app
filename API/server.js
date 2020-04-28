const express = require('express');
const database = require("./database");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors())

// GET a resource
app.get('/todos', async (req, res) => {
 const todos = await database.listTodos();
 res.json(todos);
}) // radacina url-ului
// req - request trimis la browser
// res raspuns

// POST - we create an action, send a resource from front-end
app.post('/todos', async (req, res) => {
  const title = req.body.title;
  const isCompleted = req.body.isCompleted;
  //const { title, isCompleted } = req.body;

  await database.createTodo(title, isCompleted);
  res.json(); // vreau ca serverul sa raspunda cu status 200 si Json gol
})

// PUT - folosita pt updates
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id; // const { id } = req.params
  const isCompleted = req.body.isCompleted; // const { isCompleted } = req.body

  await database.updateTodo(id, isCompleted);
  res.json();
})
//:id - accept orice numar

// DELETE - body nu are niciodata un req de tip delete
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id; // const { id } = req.params
  await database.deleteTodo(id);
  res.json();
})

app.listen(8080); // portul prin care ne putem conecta la aplicatia noastra de express