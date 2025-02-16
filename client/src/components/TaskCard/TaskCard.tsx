import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../redux/tasks/operations";
import { AppDispatch } from "../../redux/store";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import css from "./TaskCard.module.css";
import { Card } from "../../types/types";

interface TaskCardProps {
  card: Card;
}

const TaskCard: React.FC<TaskCardProps> = ({ card }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(card);

  const { _id, title, description, boardId, columnId, order } = card;

  useEffect(() => {
    setEditedCard(card);
  }, [card]);

  const handleStatusChange = async (newStatus: Card["status"]) => {
    try {
      const updatedCard = {
        ...card,
        status: newStatus,
      };
      setEditedCard(updatedCard);

      await dispatch(
        updateCard({
          _id,
          title,
          description,
          status: newStatus,
          order,
          boardId,
          columnId,
        }),
      ).unwrap();
    } catch (error) {
      setEditedCard(card);
      console.error("Failed to update card status:", error);
    }
  };

  const handleSave = async () => {
    try {
      const result = await dispatch(
        updateCard({
          ...editedCard,
          boardId,
          columnId,
        }),
      ).unwrap();
      if (result) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteCard({
          cardId: _id,
          boardId,
          columnId,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  let editingContent;
  if (isEditing) {
    editingContent = (
      <div className={css.textContainer}>
        <input
          type="text"
          value={editedCard.title}
          onChange={(e) =>
            setEditedCard((prev) => ({ ...prev, title: e.target.value }))
          }
          className={css.editableInput}
        />
        <textarea
          value={editedCard.description}
          onChange={(e) =>
            setEditedCard((prev) => ({ ...prev, description: e.target.value }))
          }
          className={css.editableTextarea}
        />
      </div>
    );
  } else {
    editingContent = (
      <div className={css.textContainer}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <div className={css.card}>
      <div className={css.infoContainer}>
        {editingContent}
        <div className={css.actionButtons}>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <div className={css.buttonsContainer}>
              <button
                className={css.editButton}
                onClick={() => setIsEditing(true)}
              >
                <MdEdit size={20} color="blue" />
              </button>
              <button
                onClick={() => handleStatusChange("ToDo")}
                className={card.status === "ToDo" ? css.active : ""}
              >
                To Do
              </button>
              <button
                onClick={() => handleStatusChange("InProgress")}
                className={card.status === "InProgress" ? css.active : ""}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange("Done")}
                className={card.status === "Done" ? css.active : ""}
              >
                Done
              </button>
              <button className={css.deleteButton} onClick={handleDelete}>
                <MdDeleteOutline size={20} color="red" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
