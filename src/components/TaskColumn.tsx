// components/TaskColumn.tsx
import React from 'react';
import TaskCard from './TaskCard';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, updateTaskStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </ul>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 mt-4 rounded">
        Add new
      </button>
    </div>
  );
};

export default TaskColumn;
