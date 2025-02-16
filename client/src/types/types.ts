export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "ToDo" | "In Progress" | "Done";
  boardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  _id: string;
  title: string;
  description: string;
  order: number;
  status: "ToDo" | "InProgress" | "Done";
  boardId: string;
  columnId: string;
}

export interface Column {
  _id: string;
  id: string;
  name: "ToDo" | "InProgress" | "Done";
  cards: Card[];
}

export interface Board {
  _id: string;
  name: string;
  tasks: Task[];
  columns: Column[];
}

export interface ServerResponse<T> {
  status: number;
  message: string;
  data: T;
}
