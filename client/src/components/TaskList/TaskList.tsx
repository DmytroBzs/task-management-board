import React, { lazy } from 'react';

const TaskCard = lazy(() => import('../TaskCard/TaskCard'));
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
