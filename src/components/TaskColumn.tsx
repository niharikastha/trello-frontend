import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { FaPlus } from 'react-icons/fa';

// Define Task interface
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: 'Urgent' | 'Medium' | 'Low';
  deadline: string;
  createdAt?: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: string) => void;
  onAddNewClick: (status: string) => void;
}

const TaskColumn: React.FC<{ title: string; tasks: Task[]; }> = ({ title, tasks }) => {
  return (
        <Droppable droppableId={title} direction="vertical">
          {(provided) => (
            <div
              className="task-column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="column-title">{title}</h2>
              <ul>
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ul>
              <button onClick={() => handleAddNewClick(title)} className="add-new-btn">
                Add new <FaPlus className="plus-icon" />
              </button>
            </div>
          )}
        </Droppable>
      );
    };

export default TaskColumn;
