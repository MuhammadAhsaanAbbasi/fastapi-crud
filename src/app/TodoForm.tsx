"use client"
import { FormEvent, useRef } from 'react'
import TodoItem from './TodoItem'
import React from 'react'
import { Todo } from '@/components/interfaces'
import useTodo from './context/TodoProvider'

const TodoForm = () => {
  const { setTodo } = useTodo()

  const ref = useRef<HTMLInputElement>(null);
  // const [todo, settodo] = useState<Todo[]>([])
  const formSubmit = async (f: FormEvent) => {
    f.preventDefault();
    const input_value: string = ref.current!.value;
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "request-mode": "no cors",
        "content-type": "application/json"
      },
      body: JSON.stringify({ "content": input_value })
    })
    const data: Todo[] = await response.json()
    if (data) {
      setTodo(data)
    }

  }
  return (
    <div className=''>
      <form onSubmit={formSubmit}>
        <div className='flex'>
          <input
            className=''
            type="text"
            placeholder='Write Todo'
            ref={ref}
          />
          <button className='rounded-r-lg px-3 py-1 bg-green-600 hover:bg-green-500 text-white shrink-0' type='submit'> Add</button>
        </div>
      </form>
      <TodoItem />
    </div>
  )
}

export default TodoForm