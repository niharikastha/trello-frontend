import React, { useState, useEffect } from 'react';
import { FaTasks, FaUser, FaCog, FaChartLine, FaPlus, FaChartBar, FaDownload, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface SidebarProps {
  onCreateNewTask: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNewTask }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user') || '';
    setUsername(user || 'User');

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
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };
  

  return (
<div className="bg-white p-4 shadow-md flex flex-col justify-between items-center h-full">
      <div className={`w-64 flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
        <div className={`flex items-center justify-center h-30 ${isDarkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
          <div >
            <div className="flex py-4">
              <FaUserCircle className="w-10 h-10 text-gray-500 mr-3" />
              <div className="text-center">
                <p className="font-bold text-lg">{username}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label className="flex items-center mr-20 cursor-pointer relative">
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
              <button className="text-sm py-1.5 px-3 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border-gray-300 rounded" onClick={()=>handleLogout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow p-4">
          <ul>
            <li className="flex items-center py-2 px-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border-gray-300 rounded">
              <FaTasks className="mr-3" />
              Home
            </li>
            <li className="flex items-center py-2 px-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border rounded">
              <FaChartLine className="mr-3" />
              Boards
            </li>
            <li className="flex items-center py-2 px-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border rounded">
              <FaCog className="mr-3" />
              Settings
            </li>
            <li className="flex items-center py-2 px-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border rounded">
              <FaUser className="mr-3" />
              Teams
            </li>
            <li className="flex items-center py-2 px-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:border rounded">
              <FaChartBar className="mr-3" />
              Analytics
            </li>
          </ul>
          <button
            onClick={onCreateNewTask}
            className="mt-4 w-full text-white py-2 px-4 rounded"
            style={{ background: 'linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)' }}
          >
            Create new task
            <FaPlus className="inline-block ml-3" />
          </button>
        </div>
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-300'} mt-auto`}>
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray py-1 px-4 rounded flex items-center">
            <FaDownload className="mr-2" />
            <div className="text-left">
              <div className="text-base">Download the app</div>
              <div className="text-xs">Get the full experience</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
