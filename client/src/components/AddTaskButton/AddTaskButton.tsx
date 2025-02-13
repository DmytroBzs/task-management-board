import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { addTask } from "../../redux/tasks/operations";
import { AppDispatch } from "../../redux/store";
import clsx from "clsx";
import css from "./AddTaskButton.module.css";

Modal.setAppElement("#root");

const AddTaskButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "ToDo",
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
    setNewTask({ title: "", description: "", status: "ToDo" });
    setErrors({ title: false, description: false });
  };

  const handleAddTask = async () => {
    if (!validateFields()) return;

    try {
      const action = await dispatch(addTask(newTask));
      if (action.meta.requestStatus === "fulfilled") {
        handleModalClose();
      }
    } catch (error) {
      console.error("Failed to add task:", error);
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
            <button
              className={clsx(css.addButton, {
                [css.disabledButton]: errors.title || errors.description,
              })}
              onClick={handleAddTask}
              disabled={errors.title || errors.description}
            >
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
