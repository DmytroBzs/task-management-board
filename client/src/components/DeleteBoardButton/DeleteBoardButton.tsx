import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { deleteBoard } from "../../redux/boards/operations";
import styles from "./DeleteBoardButton.module.css";

interface DeleteBoardButtonProps {
  boardId: string;
}

const DeleteBoardButton = ({ boardId }: DeleteBoardButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteBoard(boardId));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  return (
    <>
      <button
        className={styles.deleteButton}
        onClick={() => setIsModalOpen(true)}
      >
        Delete Board
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this board?</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBoardButton;
