import { RootState } from '../store';

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectLoading = (state: RootState) => state.tasks.loading;

export const selectError = (state: RootState) => state.tasks.error;

export const selectFoundTask = (state: RootState) =>
  state.tasks.foundTask ?? null;
