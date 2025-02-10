import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.container}>
      <RingLoader color="#1f618d" size={50} />
    </div>
  );
};

export default Loader;
