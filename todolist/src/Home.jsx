import React, { useEffect, useState } from 'react'
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';




function Home() {
    const [todos, setTodos]=useState([])

    useEffect( ()=> {
      axios.get('https://todo-lq1p.onrender.com/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    }, [])

    const fetchTodos = () => {
  axios.get('https://todo-lq1p.onrender.com/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err));
};


const handleEdit = (id) => {
axios.put('https://todo-lq1p.onrender.com/update/'+ id)
      .then(() => fetchTodos())

      .catch(err => console.log(err))
}

const handleDelete = (id) => {
  axios.delete('https://todo-lq1p.onrender.com/delete/'+ id)
     .then(() => fetchTodos())

      .catch(err => console.log(err))
}

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />
      {
        todos.length === 0 
        ?
        <div><h2>You Dont Have Any Tasks here</h2></div>
        :
        todos.map( (todo, index) => (
            <div className="todo-item" key={todo._id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ?
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                :<BsCircleFill className='icon' />
              }
               
             <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
  <div>
  <span>
    <BsFillTrashFill
      className='icon'
      onClick={() => handleDelete(todo._id)}
    />
  </span>
</div>

            </div>
        ))
      }
    </div>
  )
}

export default Home;
