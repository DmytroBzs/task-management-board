import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Board as BoardType, Card } from "../../types/types";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import DeleteBoardButton from "../DeleteBoardButton/DeleteBoardButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateCard } from "../../redux/tasks/operations";
import { DragEndEvent } from "@dnd-kit/core";

import styles from "./Board.module.css";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { _id, name, columns } = board;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }
    if (active.data.current?.columnId === over?.id) {
      return;
    }

    if (active.id !== over?.id) {
      const updatedCard: Card = {
        _id: active.id as string,
        columnId: active.data.current?.columnId || "",
        title: active.data.current?.title || "",
        description: active.data.current?.description || "",
        status:
          (over?.id as "ToDo" | "InProgress" | "Done") ||
          active.data.current?.status,
        order: active.data.current?.order || 0,
        boardId: active.data.current?.boardId || "",
      };

      dispatch(updateCard(updatedCard)).unwrap();
    }
  };

  return (
    <div className={styles.board}>
      <h2 className={styles.boardTitle}>{name}</h2>
      <div className={styles.boardButtons}>
        <AddTaskButton boardId={_id} />
        <DeleteBoardButton boardId={_id} />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.id} className={styles.column}>
              <h3>{column.name}</h3>
              <TaskList
                columnId={column.id}
                cards={column.cards.map((card) => ({
                  ...card,
                  boardId: _id,
                  columnId: column.id,
                }))}
              />
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Board;
