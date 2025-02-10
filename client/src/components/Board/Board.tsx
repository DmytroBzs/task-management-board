import React, { lazy } from 'react';
import css from './Board.module.css';
import TaskList from '../TaskList/TaskList';

const Column = lazy(() => import('../Column/Column'));

interface BoardProps {
  tasks: {
    _id: string;
    title: string;
    description: string;
    status: string;
  }[];
}

const Board: React.FC<BoardProps> = ({ tasks }) => {
  const toDoTasks = tasks.filter(task => task.status === 'ToDo');
  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');
  const doneTasks = tasks.filter(task => task.status === 'Done');
  return (
    <div className={css.container}>
      <Column title="To Do">
        <TaskList tasks={toDoTasks} />
      </Column>
      <Column title="In Progress">
        <TaskList tasks={inProgressTasks} />
      </Column>
      <Column title="Done">
        <TaskList tasks={doneTasks} />
      </Column>
    </div>
  );
};

export default Board;
