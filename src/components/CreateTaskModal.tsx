// components/CreateTaskModal.tsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { FaTimes, FaShareAlt, FaStar, FaRegSun, FaExclamationTriangle, FaCalendarAlt, FaRegEdit, FaPlus } from 'react-icons/fa';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  defaultStatus: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
  defaultStatus,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(defaultStatus); // Use defaultStatus here
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  // Update status when defaultStatus changes
  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axiosInstance.post('/tasks', {
        title,
        description,
        status,
        priority,
        deadline,
      });
      onTaskCreated();
      onClose();
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header with Close, Share, and Favorite Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={24} />
          </button>
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

        {/* Form for Task Details */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-300 p-2 text-lg text-black placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Status Selector */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-700 mr-2">
              <FaRegSun className="mr-2" />
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Selector */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-700 mr-2">
              <FaExclamationTriangle className="mr-2" />
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
            >
              <option value="Urgent">Urgent</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Due Date Picker */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-700 mr-2">
              <FaCalendarAlt className="mr-2" />
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center text-gray-700 mr-2">
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
          <div className="mb-4 flex items-center text-gray-700 cursor-pointer hover:text-gray-800">
            <FaPlus className="mr-2" />
            <span className="font-bold">Add custom property</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
