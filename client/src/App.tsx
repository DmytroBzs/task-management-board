import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { fetchTasks } from "./redux/tasks/operations";
import { AppDispatch } from "./redux/store";
import { useTasks } from "./hooks/useTasks";

const SearchBar = lazy(() => import("./components/SearchBar/SearchBar"));
const Title = lazy(() => import("./components/TItle/Title"));
const Loader = lazy(() => import("./components/Loader/Loader"));
const Board = lazy(() => import("./components/Board/Board"));
const AddTaskButton = lazy(
  () => import("./components/AddTaskButton/AddTaskButton"),
);

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, foundTask } = useTasks();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(tasks)) {
    return <p>No tasks available</p>;
  }

  let boardContent;
  if (foundTask) {
    boardContent = <Board tasks={[foundTask.task]} />;
  } else if (tasks && tasks.length > 0) {
    boardContent = <Board tasks={tasks} />;
  } else {
    boardContent = <p>No tasks available</p>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Title />
      <SearchBar />
      <AddTaskButton />
      {boardContent}
    </Suspense>
  );
};

export default App;
