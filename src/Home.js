import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState();
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        console.log(result);
        setTodos([...todos, { _id: result.data._id, task: task }]);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, task) => {
    setEditingId(id);
    setEditingTask(task);
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { task: editingTask })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, task: editingTask } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
        setEditingTask("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>todo list</h2>
      <div className="todo-input">
        <input
          type="text"
          name="todo"
          value={task || editingTask}
          onChange={(e) => setTask(e.target.value)}
        />
        {editingId ? (
          <button onClick={() => handleUpdate(editingId)} className="add-btn">
            Update
          </button>
        ) : (
          <button onClick={handleAdd} className="add-btn">
            Add
          </button>
        )}
      </div>
      {todos.length === 0 ? (
        <div>
          <h3>No Work</h3>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id}>
            {editingId === todo._id ? (
              <input
                type="text"
                value={editingTask}
                onChange={(e) => setEditingTask(e.target.value)}
              />
            ) : (
              todo.task
            )}
            {editingId === todo._id ? (
              <button onClick={() => handleUpdate(todo._id)}>Update</button>
            ) : (
              <button onClick={() => handleEdit(todo._id, todo.task)}>
                Edit
              </button>
            )}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/get")
//       .then((result) => setTodos(result.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const handleAdd = () => {
//     axios
//       .post("http://localhost:3001/add", { task: task })
//       .then((result) => {
//         console.log(result);
//         // Update todos state here
//         setTodos([...todos, { task: task }]);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3001/delete/${id}`)
//       .then(() => {
//         const updatedTodos = todos.filter((todo) => todo._id !== id);
//         setTodos(updatedTodos);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <h2>todo list</h2>
//       <div className="todo-input">
//         <input
//           type="text"
//           name="todo"
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <button onClick={handleAdd} className="add-btn">
//           Add
//         </button>
//       </div>
//       {todos.length === 0 ? (
//         <div>
//           <h3>No Work</h3>
//         </div>
//       ) : (
//         todos.map((todo) => (
//           <div>
//             {todo.task}{" "}
//             <button onClick={() => handleDelete(todo._id)}>delete</button>{" "}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Home;
