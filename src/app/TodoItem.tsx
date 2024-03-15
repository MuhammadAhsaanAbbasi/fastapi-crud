import React from 'react'
import { Todo } from '@/components/interfaces'
import useTodo from './context/TodoProvider'



const TodoItem = () => {
    const { todo, setTodo } = useTodo()

    const deletedTodo = async (todo_id: number) => {
        // console.log(todo_id);
        const response = await fetch(`http://localhost:8000/todos?todo_id=${todo_id}`, {
            method: "DELETE",
        })
        const data: Todo[] = await response.json();
        // console.log(data);
        setTodo(data)
    }

    return (
        <div className=''>

            {todo.map((todo) => (
                <div key={todo.id} className=''>
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