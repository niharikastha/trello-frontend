// components/TaskColumn.tsx

import React from 'react';
import TaskCard from './TaskCard';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  createdAt?: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: string) => void;
  onAddNewClick: (status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  updateTaskStatus,
  onAddNewClick,
}) => {
  console.log('aksbfkj', tasks);
  return (
    <div className="task-column">
      <h2 className="column-title">{title}</h2>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </ul>
      <button onClick={() => onAddNewClick(title)} className="add-new-btn">
        Add new <FaPlus className="plus-icon" />
      </button>
    </div>
  );
};

export default TaskColumn;
