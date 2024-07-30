// components/TaskBoard.tsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import TaskColumn from './TaskColumn';
import Sidebar from './Sidebar';
import Header from './Header';
import CreateTaskModal from './CreateTaskModal';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  createdAt?: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string>('To-Do');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const { data } = await axiosInstance.put(`/tasks/${taskId}`, { status });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? data : task))
      );
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleTaskCreated = () => {
    setIsModalOpen(false);
    fetchTasks();
  };

  const handleAddNewClick = (status: string) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-board">
      <Sidebar />
      <div className="main-content">
        <Header onCreateNewTask={() => handleAddNewClick('To-Do')} />
        <div className="task-columns">
          {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((column) => (
            <TaskColumn
              key={column}
              title={column}
              tasks={tasks.filter((task) => task.status === column)}
              updateTaskStatus={updateTaskStatus}
              onAddNewClick={handleAddNewClick} 
            />
          ))}
        </div>
      </div>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        defaultStatus={modalStatus}
      />
    </div>
  );
};

export default TaskBoard;
