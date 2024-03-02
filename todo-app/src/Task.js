import React from 'react';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <div>
        <strong>{task.title}</strong> - {task.description}
      </div>
      <small>Due Date: {task.dueDate}</small>
      
    </div>
  );
};

export default Task;
