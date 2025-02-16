import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { addCard } from "../../redux/tasks/operations";
import { AppDispatch } from "../../redux/store";
import clsx from "clsx";
import css from "./AddTaskButton.module.css";

Modal.setAppElement("#root");

interface AddTaskButtonProps {
  boardId: string;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ boardId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "ToDo",
    boardId,
  });
  const [errors, setErrors] = useState({ title: false, description: false });

  const validateFields = () => {
    const newErrors = {
      title: newTask.title.trim() === "",
      description: newTask.description.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask({ title: "", description: "", status: "ToDo", boardId });
    setErrors({ title: false, description: false });
  };

  const handleAddTask = async () => {
    if (!validateFields()) return;

    try {
      const result = await dispatch(
        addCard({
          ...newTask,
          order: 0,
          columnId: "ToDo",
        }),
      ).unwrap();

      if (result) {
        handleModalClose();
      }
    } catch (error) {
      console.error("Failed to add card:", error);
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
      >
        <div className={css.modalContent}>
          <h3 className={css.modalTitle}>Add new task</h3>
          <input
            className={clsx(css.input, { [css.errorInput]: errors.title })}
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          {errors.title && <p className={css.errorText}>Title is required</p>}

          <textarea
            className={clsx(css.textarea, {
              [css.errorInput]: errors.description,
            })}
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          {errors.description && (
            <p className={css.errorText}>Description is required</p>
          )}

          <div className={css.buttons}>
            <button className={clsx(css.addButton)} onClick={handleAddTask}>
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
