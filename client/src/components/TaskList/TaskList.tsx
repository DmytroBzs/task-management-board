import React from "react";
import { Card } from "../../types/types";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";

interface TaskListProps {
  cards: Card[];
}

const TaskList: React.FC<TaskListProps> = ({ cards = [] }) => {
  const sortedCards = [...cards].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.taskList}>
      {sortedCards.map((card, index) => (
        <TaskCard key={`${card._id}-${index}`} card={card} />
      ))}
    </div>
  );
};

export default TaskList;
