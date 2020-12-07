import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        return { id: task.id, name: task.name, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTask);
  }
  function handleDelete(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      handleDelete={handleDelete}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <h1>React Todo App</h1>

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {tasks.length} {tasks.length === 1 ? "task" : "tasks"} remaining
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
