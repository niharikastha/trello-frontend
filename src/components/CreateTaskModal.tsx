import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import {
  FaTimes,
  FaShareAlt,
  FaStar,
  FaRegSun,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaRegEdit,
  FaPlus,
  FaExpand
} from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: 'Urgent' | 'Medium' | 'Low';
  deadline: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  defaultStatus: string;
  task?: Task | null; 
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
  defaultStatus,
  task
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDeadline(task.deadline);
    } else {
      setTitle('');
      setDescription('');
      setStatus(defaultStatus);
      setPriority('');
      setDeadline('');
    }
  }, [task, defaultStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !status) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      if (task) {
        await axiosInstance.patch(`/tasks/${task._id}`, {
          title,
          description,
          status,
          priority: priority || 'Low',
          deadline,
        });
      } else {
        await axiosInstance.post('/tasks', {
          title,
          description,
          status,
          priority: priority || 'Low',
          deadline,
        });
      }

      onTaskCreated();
      onClose();  
    } catch (err) {
      setError('Failed to save task.');
    }
  };

  const handleDelete = async () => {
    if (!task?._id) return;

    try {
      await axiosInstance.delete(`/tasks/${task._id}`);
      onTaskCreated(); 
      onClose(); 
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 transition-all duration-00 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg h-full w-1/2 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <FaExpand size={18} />
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
              <span className="font-semibold">Share</span>
              <FaShareAlt className="ml-2" />
            </button>
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
              <span className="font-semibold">Favourite</span>
              <FaStar className="ml-2" />
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-4xl text-gray-700 placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Status Selector */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-600 mr-2 min-w-[150px]">
              <FaRegSun className="mr-2" />
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded text-gray-500"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          {/* Priority Selector */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-600 mr-2 min-w-[150px]">
              <FaExclamationTriangle className="mr-2" />
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded text-gray-500"
            >
              <option value="Urgent">Urgent</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Due Date Picker */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-600 mr-2 min-w-[150px]">
              <FaCalendarAlt className="mr-2" />
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded text-gray-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-700 mr-2 min-w-[150px]">
              <FaRegEdit className="mr-2" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
              required
            ></textarea>
          </div>

          {/* Add Custom Property */}
          <div className="mb-8 flex border-b border-gray-300 items-center text-gray-700 cursor-pointer hover:text-gray-800">
            <FaPlus className="mr-2" />
            <span className="font-bold">Add custom property</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            {task && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
