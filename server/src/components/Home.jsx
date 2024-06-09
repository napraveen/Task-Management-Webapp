import React, { useEffect } from 'react';
import { useState } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();
  const [edittedValue, setEdittedValue] = useState('');
  const handleAddTodo = async () => {
    try {
      const response = await fetch(
        'https://task-management-webapp-sonq.vercel.app/api/addone',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, dueDate }),
        }
      );
      const data = await response.json();
      setTodos(data.todos);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      const response = await fetch(
        `https://task-management-webapp-sonq.vercel.app/api/removetodo/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setTodos(data.todos);
      console.log('data ', data.todos);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditing = async (id) => {
    try {
      const response = await fetch(
        `https://task-management-webapp-sonq.vercel.app/api/edittodo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id, title: edittedValue }),
        }
      );
      const data = await response.json();
      console.log('hoo ', data);
      setTodos(data.todos);
      setEdittedValue('');
      setId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleClick = (title) => {
    navigate(`/${title}`);
  };

  useEffect(() => {
    async function showAll() {
      try {
        const res = await fetch(
          'https://task-management-webapp-sonq.vercel.app/api/showall'
        );
        const data = await res.json();
        setTodos(data.todos);
        console.log('data ', data.todos);
      } catch (error) {
        console.error(error);
      }
    }

    showAll();
  }, []);

  return (
    <div>
      {' '}
      <div className="container" style={{ backgroundColor: '#B3A7E9' }}>
        <div className="todo">
          <h1>Task Manager 📃🖊️ </h1>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Due-Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="button" onClick={handleAddTodo} className="add-button">
            Add
          </button>
        </div>
        <div>
          <ul>
            <h1 style={{ marginBottom: '50px' }}>Your Tasks</h1>
            {todos.map((todo) => (
              <li key={todo._id} onClick={() => setId(todo._id)}>
                {editId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={edittedValue}
                      placeholder="Enter Title"
                      onChange={(e) => setEdittedValue(e.target.value)}
                      className="edit-input"
                    />

                    <button
                      onClick={() => handleEditing(todo._id, title)}
                      className="edit-button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex' }}>
                    {' '}
                    <div style={{ width: '150px' }}>
                      <span title="Double Click to Edit">{todo.title}</span>
                      <span
                        className="material-icons"
                        style={{
                          fontSize: '15px',
                          color: 'white',
                          cursor: 'pointer',
                          marginLeft: '10px',
                        }}
                        onClick={() => handleTitleClick(todo.title)}
                        title="Click to view more info"
                      >
                        info
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveTodo(todo._id)}
                      className="remove-button"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
