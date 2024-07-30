// pages/task-board.tsx

import React from 'react';
import TaskBoard from '../../components/TaskBoard';

const TaskBoardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskBoard />
    </div>
  );
};

export default TaskBoardPage;
