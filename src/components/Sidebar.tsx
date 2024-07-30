import React, { useState, useEffect } from 'react';
import { FaTasks, FaUser, FaCog, FaChartLine, FaPlus, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Get the user info from localStorage
    const user = localStorage.getItem('user') || '';
    setUsername(user || 'User'); 

    // Get the dark mode preference from localStorage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference) {
      const isDark = darkModePreference === 'true';
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    document.documentElement.classList.toggle('dark', newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  return (
    <div className="bg-white p-4 shadow-md">
    <div className={`w-64 flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
      <div className={`flex items-center justify-center h-30 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="text-center">
          <br /><p className="font-bold text-lg">{username}</p><br />
          <div className="flex items-center justify-center">
            <button className="text-sm text-gray-400 hover:text-white">
              Logout
            </button>
            <label className="flex items-center ml-20 cursor-pointer relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <span className={`w-10 h-4 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-300'} rounded-full shadow-inner`}></span>
              <span
                className={`w-4 h-3 bg-white rounded-full shadow absolute transform transition-transform ${isDarkMode ? 'translate-x-full' : 'translate-x-0'}`}
                style={{ left: '0.125rem', top: '0.125rem' }}
              ></span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4">
        <ul>
          <li className="flex items-center py-2 hover:bg-gray-700 cursor-pointer">
            <FaTasks className="mr-3" />
            Home
          </li>
          <li className="flex items-center py-2 hover:bg-gray-700 cursor-pointer">
            <FaChartLine className="mr-3" />
            Boards
          </li>
          <li className="flex items-center py-2 hover:bg-gray-700 cursor-pointer">
            <FaUser className="mr-3" />
            Teams
          </li>
          <li className="flex items-center py-2 hover:bg-gray-700 cursor-pointer">
            <FaCog className="mr-3" />
            Settings
          </li>
          <li className="flex items-center py-2 hover:bg-gray-700 cursor-pointer">
            <FaChartBar className="mr-3" />
            Analytics
          </li>
        </ul>
        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
          <FaPlus className="inline-block mr-2" />
          Create new task
        </button>
      </div>
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Download the app
        </button>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
