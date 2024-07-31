import React, { useEffect, useState } from 'react';
import { FaTags, FaShareAlt, FaMobileAlt, FaSearch, FaPlus, FaCalendarAlt, FaStar, FaFilter, FaShareSquare, FaQuestionCircle } from 'react-icons/fa';

interface HeaderProps {
  onCreateNewTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateNewTask, searchQuery, onSearchChange }) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user') || '';
    const name = user || 'User';
    const firstName = name.split(' ')[0];
    setFirstName(firstName);
  }, []);

  return (
    <div className="pb-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-black">Good morning, {firstName}&apos;s!</h1>
        <button className="flex items-center hover:bg-purple-100 text-black py-2 px-4 rounded space-x-2">
          <span>Help & feedback</span>
          <FaQuestionCircle className="text-xl" />
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaTags className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold text-gray-500">Introducing tags</h2>
            <p className="text-sm text-gray-400">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaShareAlt className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold text-gray-500">Share Notes Instantly</h2>
            <p className="text-sm text-gray-400">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaMobileAlt className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold text-gray-500">Access Anywhere</h2>
            <p className="text-sm text-gray-400">Sync your notes across all devices. Stay productive whether you&apos;re on your phone, tablet, or computer.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center w-1/4 bg-white border border-gray-300 rounded p-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border-none outline-none text-gray-600"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="text-gray-400 mr-2" />
        </div>
        <div className="flex-1"></div>
        <button className="flex items-center bg-dark-gray text-black rounded p-2">
          Calendar view <FaCalendarAlt className="ml-2" />
        </button>
        <button className="flex items-center bg-dark-gray text-black rounded p-2">
          Automation <FaStar className="ml-2" />
        </button>
        <button className="flex items-center bg-dark-gray text-black rounded p-2">
          Filter  <FaFilter className="ml-2" />
        </button>
        <button className="flex items-center bg-dark-gray text-black rounded p-2">
          Share  <FaShareSquare className="ml-2" />
        </button>
        <button
          onClick={onCreateNewTask}
          className="flex items-center text-white py-2 px-4 rounded"
          style={{ background: 'linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)' }}
        >
          Create New <FaPlus className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Header;
