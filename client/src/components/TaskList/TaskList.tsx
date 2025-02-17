import React from "react";
import { Card } from "../../types/types";
import TaskCard from "../TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/core";

import styles from "./TaskList.module.css";

interface TaskListProps {
  cards: Card[];
  columnId: string;
}

const TaskList: React.FC<TaskListProps> = ({ cards = [], columnId }) => {
  const sortedCards = [...cards].sort((a, b) => a.order - b.order);
  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <div ref={setNodeRef} className={styles.taskList}>
      {sortedCards.length === 0 && (
        <div className={styles.dropZone}>Drop here</div>
      )}

      {sortedCards.map((card, index) => (
        <TaskCard
          key={card._id || `card-${index}`}
          card={{ ...card, boardId: card.boardId, columnId }}
        />
      ))}
    </div>
  );
};

export default TaskList;
