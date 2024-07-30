// components/Header.tsx
import React, { useEffect, useState } from 'react';
import { FaTags, FaShareAlt, FaMobileAlt, FaSearch,FaPlus, FaCalendarAlt, FaStar, FaFilter, FaShareSquare, FaQuestionCircle } from 'react-icons/fa';

const Header: React.FC = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Fetch user from local storage and set first name
    const user = localStorage.getItem('user') || '';
    const name = user || 'User';
    const firstName = name.split(' ')[0]; // Get first name
    setFirstName(firstName);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Good morning, {firstName}!</h1>
        <button className="flex items-center hover:bg-purple-100 text-black py-2 px-4 rounded space-x-2">
          <span>Help & feedback</span>
          <FaQuestionCircle className="text-xl" />
        </button>
      </div>
      
      {/* Feature Boxes Row */}
      <div className="flex space-x-4 mb-4">
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaTags className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold">Introducing tags</h2>
            <p className="text-sm text-gray-500">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaShareAlt className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold">Share Notes Instantly</h2>
            <p className="text-sm text-gray-500">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm flex items-center space-x-2 text-gray-700 flex-1">
          <FaMobileAlt className="text-xl text-purple-600" />
          <div>
            <h2 className="font-semibold">Access Anywhere</h2>
            <p className="text-sm text-gray-500">Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
          </div>
        </div>
      </div>

      {/* Search Bar and Action Buttons Row */}
      <div className="flex items-center space-x-2">
      <div className="flex items-center w-1/4 bg-white border border-gray-300 rounded p-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border-none outline-none"
          />
          <FaSearch className="text-gray-400 mr-2" />
        </div>
        <div className="flex-1"></div> {/* Space between search and Calendar view */}
        <button className="flex items-center bg-white text-black border border-gray-300 rounded p-2">
          <FaCalendarAlt className="mr-2" /> Calendar view
        </button>
        <button className="flex items-center bg-white text-black border border-gray-300 rounded p-2">
          <FaStar className="mr-2" /> Automation
        </button>
        <button className="flex items-center bg-white text-black border border-gray-300 rounded p-2">
          <FaFilter className="mr-2" /> Filter
        </button>
        <button className="flex items-center bg-white text-black border border-gray-300 rounded p-2">
          <FaShareSquare className="mr-2" /> Share
        </button>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded">
          <FaPlus className="mr-2" />           Create new

        </button>
      </div>
    </div>
  );
};

export default Header;
