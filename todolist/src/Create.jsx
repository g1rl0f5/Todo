import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!task.trim()) {
      setError('Task cannot be empty');
      return;
    }

    axios.post('https://mern-todo-zor9.onrender.com/add', { task })
      .then(() => {
        setTask('');
        setError('');
        location.reload();
      })
      .catch(err => {
        console.log(err);
        setError('Something went wrong. Try again.');
      });
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder='Enter Your Task'
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          if (error) setError(''); // clear error while typing
        }}
      />
      <button type="button" onClick={handleAdd}>Add</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}



export default Create
