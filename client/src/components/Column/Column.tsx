import React from "react";
import css from "./Column.module.css";

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ title, children }) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Column;
