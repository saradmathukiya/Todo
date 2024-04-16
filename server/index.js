const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Deleted successfully" }))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  TodoModel.findByIdAndUpdate(id, { task: task })
    .then(() => res.json({ message: "Updated successfully" }))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const TodoModel = require("./Models/Todo");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017");

// app.get("/get", (req, res) => {
//   TodoModel.find()
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.post("/add", (req, res) => {
//   const task = req.body.task;
//   TodoModel.create({
//     task: task,
//   })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   TodoModel.findByIdAndDelete(id)
//     .then(() => res.json({ message: "Deleted successfully" }))
//     .catch((err) => res.json(err));
// });

// app.listen(3001, () => {
//   console.log("server is running");
// });

// // code for basic starting of server
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.listen(3001, () => {
// //   console.log("server is running");
// // });
