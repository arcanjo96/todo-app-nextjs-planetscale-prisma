'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);


  async function fetchTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  }

  async function handleSubmit() {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        description
      })
    });

    await fetchTodos();
    setDescription('');
  }

  async function handleRemove(id: string) {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <div className="w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ToDo App</h1>
          <div className="mt-4 flex">
            <input
              className="w-80 border-b-2 border-gray-500 text-black"
              type="text" placeholder="Enter your task here"
              onChange={(event) => setDescription(event.currentTarget.value)}
              value={description}
            />
            <button
              className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
              onClick={handleSubmit}
            >
              <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
              <span>Add</span>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ul>
            {todos.map((todo: any) => {
              return (
                <li className="p-2 rounded-lg" key={todo.id} >
                  <div className="flex align-middle flex-row justify-between">
                    <div className="p-2">
                      <input type="checkbox" className="h-6 w-6" value={todo.done} checked={todo.done} readOnly />
                    </div>
                    <div className="p-2">
                      <p className={`text-lg text-black ${todo.done && 'line-through'}`}>{todo.description}</p>
                    </div>
                    <button
                      className="ml-2 border-2 border-red-500 p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg flex"
                      onClick={() => handleRemove(todo.id)}
                      >
                      <span>Remove</span>
                    </button>
                  </div>
                  <hr className="mt-2" />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-8">
          <button
            className="border-2 border-red-500 p-2 text-red-500"
          >Clear Completed Task</button>
          <button
            className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
          >Reset Todo List</button>
        </div>
      </div>
    </div>
  )
}
