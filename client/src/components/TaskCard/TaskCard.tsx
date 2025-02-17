import React, { useState } from "react";
import { Card } from "../../types/types";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../redux/tasks/operations";
import { AppDispatch } from "../../redux/store";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import css from "./TaskCard.module.css";

interface TaskCardProps {
  card: Card;
}

const TaskCard: React.FC<TaskCardProps> = ({ card }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(card);
  const { _id, title, description, boardId, columnId, order } = card;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
    data: {
      boardId,
      columnId,
      title,
      description,
      order,
    },
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

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
      <div
        className={css.infoContainer}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <div className={css.textContainer}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.card}>
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

            <button className={css.deleteButton} onClick={handleDelete}>
              <MdDeleteOutline size={20} color="red" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
