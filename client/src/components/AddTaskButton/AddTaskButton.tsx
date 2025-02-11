import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import css from './AddTaskButton.module.css';
import { addTask } from '../../redux/tasks/operations';
import { AppDispatch } from '../../redux/store';

Modal.setAppElement('#root');

const AddTaskButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'ToDo',
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', status: 'ToDo' });
  };

  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        const action = await dispatch(addTask(newTask));

        if (action.meta.requestStatus === 'fulfilled') {
          handleModalClose();
        }
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  };

  return (
    <div>
      <button
        className={css.addTaskButton}
        onClick={() => setIsModalOpen(true)}
      >
        Add new task
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add New Task"
        className={css.modal}
        overlayClassName={css.overlay}
        ariaHideApp={false}
      >
        <div className={css.modalContent}>
          <h3 className={css.modalTitle}>Add new task</h3>
          <input
            className={css.input}
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            className={css.textarea}
            placeholder="Task description"
            value={newTask.description}
            onChange={e =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <div className={css.buttons}>
            <button className={css.addButton} onClick={handleAddTask}>
              Add
            </button>
            <button className={css.closeButton} onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddTaskButton;
