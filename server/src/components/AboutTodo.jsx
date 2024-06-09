import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AboutTodo = () => {
  const { title } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`http://localhost:4000/api/todo/${title}`);
        const data = await res.json();
        setTodo(data.todo);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTodo();
  }, [title]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="abouttodo-container">
      <h2>{todo.title} </h2>
      <h3>Due date: {todo.dueDate}</h3>
      <p>{todo.description}</p>
    </div>
  );
};

export default AboutTodo;
