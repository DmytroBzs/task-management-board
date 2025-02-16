import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchBoards } from "./redux/boards/operations";
import { useBoards } from "./hooks/useBoards";
import { AddBoardButton, Board, SearchBar, Loader } from "./components";
import styles from "./App.module.css";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards = [], loading, error, foundBoard } = useBoards();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  let content;
  if (foundBoard) {
    content = <Board board={foundBoard} />;
  } else if (Array.isArray(boards) && boards.length > 0) {
    content = boards.map((board) => <Board key={board._id} board={board} />);
  } else {
    content = <p className={styles.noBoards}>No boards available</p>;
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Task Management</h1>
      <SearchBar />
      <AddBoardButton />
      <div className={styles.boardsContainer}>{content}</div>
    </div>
  );
};

export default App;
