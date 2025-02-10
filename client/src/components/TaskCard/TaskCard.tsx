import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../../redux/tasks/operations';
import { AppDispatch } from '../../redux/store';
import { TiDeleteOutline } from 'react-icons/ti';
import css from './TaskCard.module.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTask(task._id)).then(() => {
      dispatch(fetchTasks());
    });
  };

  return (
    <div className={css.card}>
      <div className={css.infoContainer}>
        <div className={css.textContainer}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>

        <div className={css.buttonsContainer}>
          <button onClick={handleDelete} className={css.deleteButton}>
            <TiDeleteOutline size={30} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
