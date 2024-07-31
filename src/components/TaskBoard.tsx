import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import axiosInstance from '../utils/axiosConfig';
import { FaPlus, FaClock } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import Sidebar from './Sidebar';
import Header from './Header';
import CreateTaskModal from './CreateTaskModal';

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    } else {
      const updatedTasks = tasks.map(task =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      );

      setTasks(updatedTasks);
      updateTaskStatus(draggableId, destination.droppableId);
    }
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

  const TaskCard: React.FC<{ task: Task; index: number; }> = ({ task, index }) => {
    const priorityColors: { [key in Task['priority']]: string } = {
      Urgent: 'priority-urgent',
      Medium: 'priority-medium',
      Low: 'priority-low',
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-board">
      <Sidebar />
      <div className="sidebar-placeholder">Sidebar</div>
      <div className="main-content">
        <Header onCreateNewTask={() => handleAddNewClick('To-Do')} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-columns">
            {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((column) => (
              <TaskColumn
                key={column}
                title={column}
                tasks={tasks.filter((task) => task.status === column)}
              />
            ))}
          </div>
        </DragDropContext>
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
