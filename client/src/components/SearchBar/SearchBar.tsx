import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchTaskById } from '../../redux/tasks/operations';
import css from './SearchBar.module.css';
import React from 'react';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (
    { searchInput }: { searchInput: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!searchInput.trim()) return;
    dispatch(fetchTaskById(searchInput));
    resetForm();
  };

  return (
    <Formik initialValues={{ searchInput: '' }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <Field
          className={css.input}
          type="text"
          name="searchInput"
          placeholder="Enter Task ID..."
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
