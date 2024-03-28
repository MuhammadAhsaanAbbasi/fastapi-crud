"use client"
import { FormEvent, useRef, useState } from 'react'
import TodoItem from './TodoItem'
import React from 'react'
import { Todo } from '@/components/interfaces'
import useTodo from '@/components/context/TodoProvider'

const TodoForm = () => {
  const { setTodo, addTodo } = useTodo()
  const [input_value, setInput_Value] = useState("")

  const formSubmit = async (f: FormEvent) => {
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "request-mode": "no cors",
        "content-type": "application/json"
      },
      body: JSON.stringify({ "content": input_value })
    })
    const data: Todo = await response.json()
    if (data) {
      addTodo(data)
    }
    f.preventDefault();
    setInput_Value("")
  }
  return (
    <div className=''>
      <form onSubmit={formSubmit}>
        <div className='flex'>
          <input
            className=''
            type="text"
            placeholder='Write Todo'
            onChange={(e) => setInput_Value(e.target.value)}
          />
          <button className='rounded-r-lg px-3 py-1 bg-green-600 hover:bg-green-500 text-white shrink-0' type='submit'> Add</button>
        </div>
      </form>
      <TodoItem />
    </div>
  )
}

export default TodoForm