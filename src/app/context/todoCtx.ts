import { createContext } from "react";
import { Todo } from "@/components/interfaces";
export const todoctx = createContext(
    {
        todo: [{
            id: 0,
            content : "",
            status: false
        }],
        setTodo: (todo: Todo[]) => { },
        addTodo: (todo: Todo) => { },
        deleteTodo: (id: number) => { }
    }
)