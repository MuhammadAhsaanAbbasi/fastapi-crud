"use client"
import { todoctx } from "./todoCtx";
import { useState, useContext } from "react";
import { Todo } from "@/components/interfaces";

export const TodoProvider = ({ children }: {
	children: React.ReactNode
}) => {
	const [todo, setTodo] = useState<Todo[]>([]);

	const addTodo = (todo: Todo) => {
		setTodo((prev)=>[{id: todo.id, content:todo.content, status:todo.status}, ...prev])
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