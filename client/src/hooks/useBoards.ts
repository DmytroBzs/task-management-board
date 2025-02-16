import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useBoards = () => {
  const boards = useSelector((state: RootState) => state.boards.items);
  const loading = useSelector((state: RootState) => state.boards.loading);
  const error = useSelector((state: RootState) => state.boards.error);
  const foundBoard = useSelector((state: RootState) => state.boards.foundBoard);

  return { boards, loading, error, foundBoard };
};
