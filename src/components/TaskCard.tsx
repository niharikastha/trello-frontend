// components/TaskCard.tsx

import React from 'react';
import { FaClock } from 'react-icons/fa'; // Import the clock icon from react-icons

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handle invalid date
  }
  return date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
};

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: 'Urgent' | 'Medium' | 'Low'; // Ensure priority is one of these values
  deadline: string;
}

interface TaskCardProps {
  task: Task;
  updateTaskStatus: (taskId: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateTaskStatus }) => {
  const priorityColors: { [key in Task['priority']]: string } = {
    Urgent: 'priority-urgent',
    Medium: 'priority-medium',
    Low: 'priority-low',
  };

  return (
    <li className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
      </div>
      <p className="task-desc">{task.description}</p>
      <span className={`task-priority ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
      <div className="task-due-date">
        <FaClock className="time-icon" />
        <span>{formatDate(task.deadline)}</span>
      </div>
    </li>
  );
};

export default TaskCard;
