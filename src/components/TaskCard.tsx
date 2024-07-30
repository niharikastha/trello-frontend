// components/TaskCard.tsx

import React from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
  updateTaskStatus: (taskId: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateTaskStatus }) => {
  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  return (
    <li className="bg-gray-100 p-4 mb-4 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <span
          className={`px-2 py-1 text-xs font-bold text-white rounded ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <p className="text-gray-500 text-sm mt-1">Due: {task.dueDate}</p>
      <select
        value={task.status}
        onChange={(e) => updateTaskStatus(task._id, e.target.value)}
        className="mt-2 block w-full bg-white border border-gray-300 text-gray-800 rounded"
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Under Review">Under Review</option>
        <option value="Completed">Completed</option>
      </select>
    </li>
  );
};

export default TaskCard;
