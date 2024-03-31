"use client"
import { Todo } from "../../../typings";
import { todoctx } from "./todoCtx";
import { useState, useContext } from "react";

export const TodoProvider = ({ children }: {
	children: React.ReactNode
}) => {
	const [todo, setTodo] = useState<Todo[]>([]);

	const addTodo = (todo: Todo) => {
		setTodo((prev)=>[{id: todo.id, title:todo.title, status: todo.status}])
	}
	
	const deleteTodo = async (id: number) =>{
		setTodo((prev) => prev.filter((todo) => todo.id !== id))
	}
	return (
		<todoctx.Provider value={{ todo, setTodo, addTodo, deleteTodo }}>
			{children}
		</todoctx.Provider>
	)
}
export default function useTodo() {
	return useContext(todoctx)
}