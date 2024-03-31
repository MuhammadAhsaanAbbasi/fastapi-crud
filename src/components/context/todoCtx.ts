import { createContext } from "react";
import { Todo } from "../../../typings";
export const todoctx = createContext(
    {
        todo: [{
            id: 0,
            title : "",
            status: false
        }],
        setTodo: (todo: Todo[]) => { },
        addTodo: (todo: Todo) => { },
        deleteTodo: (id: number) => { }
    }
)