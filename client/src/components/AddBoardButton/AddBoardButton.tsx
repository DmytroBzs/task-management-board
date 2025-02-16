import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createBoard } from "../../redux/boards/operations";
import styles from "./AddBoardButton.module.css";

const AddBoardButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await dispatch(createBoard(title.trim()));
      setTitle("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        + Add Board
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter board title"
              autoFocus
            />
            <div className={styles.buttons}>
              <button type="submit">Create</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBoardButton;
