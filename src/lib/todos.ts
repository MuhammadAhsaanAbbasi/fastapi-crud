"use server"
import * as z from "zod"
import { cookies } from "next/headers";
import { TodoSchema } from "../../schemas";

export const addTodos = async (values: z.infer<typeof TodoSchema>) => {
    const cookieStore = cookies().get('access_token');
    console.log(cookieStore);
    const response = await fetch("http://localhost:8000/api/auth/todo/", {
        method: "POST",
        headers: {
            "request-mode": "no cors",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieStore?.value}`
        },
        body: JSON.stringify({
            "title": values.title,
        })
    })
    const data = await response.json();
    return data;
}

export const getTodos = async () => {
    const cookieStore = cookies().get('access_token');
    const response = await fetch("http://localhost:8000/api/auth/todo/", {
        method: "GET",
        headers: {
            "request-mode": "no cors",
            "Content-type": "application/json",
            "Authorization": `Bearer ${cookieStore?.value}`
        }
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const deleteTodos = async (todo_id: number) => {
    const cookieStore = cookies().get('access_token');
    const response = await fetch(`http://localhost:8000/api/auth/todo/${todo_id}`, {
        method: "DELETE",
        headers: {
            "request-mode": "no cors",
            "Authorization": `Bearer ${cookieStore?.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo_id)
    })
    if (response.status !== 200) {
        throw new Error(`Failed to delete todo with ID ${todo_id}. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data
}