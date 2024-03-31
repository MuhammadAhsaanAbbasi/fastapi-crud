import React, { useEffect } from 'react'
import useTodo from '@/components/context/TodoProvider'
import { Todo } from '../../typings'
import { getTodos } from '@/lib/todos'



const TodoItem = () => {
    const { todo, setTodo, deleteTodo } = useTodo()

    const deletedTodo = async (todo_id: number) => {
        // console.log(todo_id);
        // const response = await fetch(`http://localhost:8000/todos/${todo_id}`, {
        //     method: "DELETE",
        // })
        // const data: Todo = await response.json();
        // // console.log(data);
        // deleteTodo(data.id)
    }

    useEffect(()=>{
        const fetchedData = async ()=>{
            const response: Todo[] = await getTodos()
            setTodo(response)
        }
        fetchedData()
    },[setTodo])
    return (
        <div className=''>

            {todo?.map((todo) => (
                <div key={todo.id} className='flex items-center gap-2'>
                    <h1>
                        {todo.title.charAt(0).toUpperCase() + todo.title.slice(1).toLowerCase()}
                    </h1>

                    <button onClick={() => deletedTodo(todo.id)}
                    >❌</button>
                </div>
            ))}
        </div>
    )
}

export default TodoItem