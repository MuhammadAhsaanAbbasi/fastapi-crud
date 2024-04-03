import React, { useEffect } from 'react'
import useTodo from '@/components/context/TodoProvider'
import { Todo } from '../../typings'
import { deleteTodos, getTodos } from '@/lib/todos'
import { useRouter } from "next/navigation"
import { Button } from './ui/button'
import { deleteCookies } from '@/lib/cookies'


const TodoItem = () => {
    const { todo, setTodo, deleteTodo } = useTodo()
    const router = useRouter()
    const deletedTodo = async (todo_id: number) => {
        console.log(todo_id);
        const data = await deleteTodos(todo_id)
        deleteTodo(data.id)
        router.refresh()
    }

    const deletedCookies = async () => {
        try{
            await deleteCookies();
            router.refresh()
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchedData = async () => {
            const response: Todo[] = await getTodos()
            setTodo(response)
        }
        fetchedData()
    }, [setTodo])
    return (
        <div className=''>
            {todo && Array.isArray(todo) && todo.length > 0 ? (
            todo.map((todoItem) => (
                <div key={todoItem.id} className='flex items-center gap-2'>
                    <h1>
                        {todoItem.title.charAt(0).toUpperCase() + todoItem.title.slice(1).toLowerCase()}
                    </h1>
                    <button onClick={() => deletedTodo(todoItem.id)}>❌</button>
                </div>
            ))
        ) : (
            <p>No todos found</p>
        )}
        <Button onClick={()=>{deletedCookies()}}>Sign Out</Button>
        </div>
    )
}

export default TodoItem