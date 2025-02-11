import { useSelector } from "react-redux";
import {
  selectTasks,
  selectLoading,
  selectError,
  selectFoundTask,
} from "../redux/tasks/selectors";

export const useTasks = () => {
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const foundTask = useSelector(selectFoundTask);
  const error = useSelector(selectError);

  return { tasks, loading, error, foundTask };
};
