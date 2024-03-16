import React, { useEffect } from 'react'
import { Todo } from '@/components/interfaces'
import useTodo from './context/TodoProvider'



const TodoItem = () => {
    const { todo, setTodo, deleteTodo } = useTodo()

    const deletedTodo = async (todo_id: number) => {
        // console.log(todo_id);
        const response = await fetch(`http://localhost:8000/todos/${todo_id}`, {
            method: "DELETE",
        })
        const data: Todo = await response.json();
        // console.log(data);
        deleteTodo(data.id)
    }

    useEffect(()=>{
        const fetchedData = async ()=>{
            const response = await fetch("http://localhost:8000/todos")
            const data: Todo[] = await response.json()
            setTodo(data)
        }
        fetchedData()
    },[setTodo])
    return (
        <div className=''>

            {todo.map((todo) => (
                <div key={todo.id} className='flex items-center gap-2'>
                    <h1>
                        {todo.content.charAt(0).toUpperCase() + todo.content.slice(1)}
                    </h1>

                    <button onClick={() => deletedTodo(todo.id)}
                    >❌</button>
                </div>
            ))}
        </div>
    )
}

export default TodoItem