import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { FaClock } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

// Define Task interface
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: 'Urgent' | 'Medium' | 'Low';
  deadline: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
}

  const TaskCard: React.FC<{ task: Task; index: number; }> = ({ task, index }) => {
    const priorityColors: { [key in Task['priority']]: string } = {
      Urgent: 'priority-urgent',
      Medium: 'priority-medium',
      Low: 'priority-low',
    };

  const formatDistance = (date: Date): string => {
    const distance = formatDistanceToNow(date, { addSuffix: false });
    return distance
      .replace('day', 'd')
      .replace('days', 'd')
      .replace('hour', 'hr')
      .replace('hours', 'hr')
      .replace('minute', 'min')
      .replace('minutes', 'min')
      .replace('second', 'sec')
      .replace('seconds', 'sec');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toISOString().split('T')[0];
  };

  const createdAtRelative = task.createdAt ? formatDistance(new Date(task.createdAt)) + ' ago' : '';

  return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <li
              className="task-card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
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
              <div className="task-created-at">
                {createdAtRelative}
              </div>
            </li>
          )}
        </Draggable>
      );
    };

export default TaskCard;
