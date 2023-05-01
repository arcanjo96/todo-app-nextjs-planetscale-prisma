'use client'

import { useEffect, useState } from "react";
import { SkeletonCard } from "../SkeletonCard";

export default function Home() {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);


  async function fetchTodos() {
    setLoading(true);
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
    setLoading(false);
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

    await fetchTodos();
  }

  async function handleUpdate(id: string, data: any) {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    await fetchTodos();
  }

  async function handleReset() {
    await fetch(`/api/todos/reset`, {
      method: 'POST',
    });

    await fetchTodos();
  }

  async function handleClearCompletedTasks() {
    await fetch(`/api/todos/clear`, {
      method: 'POST',
    });

    await fetchTodos();
  }

  return (
    <div className="w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 max-w-md mx-auto">
        {/* <Alert type="error" /> */}
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
            {loading ? Array(todos.length || 1).fill(0).map((_, index) => <SkeletonCard key={index} />) : todos.map((todo: any) => {
              return (
                <li className="p-2 rounded-lg" key={todo.id} >
                  <div className="flex align-middle flex-row justify-between">
                    <div className="p-2">
                      <input type="checkbox" className="h-6 w-6" defaultChecked={!!todo.done} onChange={(event) => {
                        handleUpdate(todo.id, {
                          done: !!event.currentTarget.checked
                        });
                      }} />
                    </div>
                    <div className="p-2 overflow-hidden whitespace-nowrap">
                      <p className={`truncate text-lg text-black ${(todo.done || todo.checked) && 'line-through'}`}>{todo.description}</p>
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
            onClick={() => handleClearCompletedTasks()}
          >Clear Completed Tasks</button>
          <button
            className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
            onClick={() => handleReset()}
          >Reset Todo List</button>
        </div>
      </div>
    </div>
  )
}
