import React from "react";
import TaskItem from "./TaskItem";

// Komponen untuk menampilkan daftar task
const TaskList = ({ tasks, categories, onToggleStatus, onDeleteTask }) => (
  <ul className="space-y-3">
    {tasks.map((task) => {
      const category = categories.find((cat) => cat._id === task.categoryId);
      return (
        <TaskItem
          key={task.id}
          task={task}
          category={category}
          onToggleStatus={onToggleStatus}
          onDeleteTask={onDeleteTask}
        />
      );
    })}
  </ul>
);

export default TaskList;