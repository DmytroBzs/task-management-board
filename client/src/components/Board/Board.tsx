import React from "react";
import { Board as BoardType } from "../../types/types";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import DeleteBoardButton from "../DeleteBoardButton/DeleteBoardButton";
import styles from "./Board.module.css";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const { _id, name, columns } = board;

  return (
    <div className={styles.board}>
      <h2 className={styles.boardTitle}>{name}</h2>
      <div className={styles.boardButtons}>
        <AddTaskButton boardId={_id} />
        <DeleteBoardButton boardId={_id} />
      </div>

      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.id} className={styles.column}>
            <h3>{column.name}</h3>
            <TaskList
              cards={column.cards.map((card) => ({
                ...card,
                boardId: _id,
                columnId: column.id,
              }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
