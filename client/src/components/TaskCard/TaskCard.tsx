import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateTask,
  fetchTasks,
  deleteTask,
} from '../../redux/tasks/operations';
import { AppDispatch } from '../../redux/store';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { MdSave, MdCancel } from 'react-icons/md';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleDelete = () => {
    dispatch(deleteTask(task._id)).then(() => {
      dispatch(fetchTasks());
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask)).then(() => {
      dispatch(fetchTasks());
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const changeStatus = (newStatus: string) => {
    setEditedTask(prev => ({ ...prev, status: newStatus }));
    dispatch(updateTask({ ...editedTask, status: newStatus })).then(() => {
      dispatch(fetchTasks());
    });
  };

  return (
    <div className={css.card}>
      <div className={css.infoContainer}>
        {isEditing ? (
          <div className={css.textContainer}>
            <input
              type="text"
              value={editedTask.title}
              onChange={e =>
                setEditedTask(prev => ({ ...prev, title: e.target.value }))
              }
              className={css.editableInput}
            />
            <textarea
              value={editedTask.description}
              onChange={e =>
                setEditedTask(prev => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={css.editableTextarea}
            />
          </div>
        ) : (
          <div className={css.textContainer}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
        )}

        <div className={css.buttonsContainer}>
          {isEditing ? (
            <>
              <button onClick={handleSave} className={css.button}>
                <MdSave size={25} color="green" />
              </button>
              <button onClick={handleCancel} className={css.button}>
                <MdCancel size={25} color="gray" />
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className={css.button}>
              <FiEdit size={23} color="4439db" />
            </button>
          )}
          <div className={css.statusButtons}>
            <button onClick={() => changeStatus('ToDo')}>To Do</button>
            <button onClick={() => changeStatus('InProgress')}>
              In Progress
            </button>
            <button onClick={() => changeStatus('Done')}>Done</button>
          </div>
          <button onClick={handleDelete} className={css.button}>
            <MdDeleteOutline size={30} color="c71f14" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
