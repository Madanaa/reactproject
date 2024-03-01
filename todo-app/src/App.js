import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post('http://localhost:8181/api/tasks', {
        title: newTask,
        description: '',
        dueDate: '2024-03-01', // Example due date
        status: 'IN_PROGRESS', // Example status
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8181/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    try {
      await axios.put(`http://localhost:8181/api/tasks/${id}`, updatedTasks.find((task) => task.id === id));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      ))}
    </div>
  );
};

export default TodoApp;
