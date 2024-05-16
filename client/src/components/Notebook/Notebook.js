import React from 'react';
import { useParams } from 'react-router-dom';

const Notebook = () => {
  // Accessing the notebook_id parameter using useParams hook
  const { notebook_id } = useParams();

  return (
    <div>
      <h2>Notebook ID: {notebook_id}</h2>
    </div>
  );
};

export default Notebook;
