"use client"
import { FormEvent, useRef, useState } from 'react'
import TodoItem from './TodoItem'
import React from 'react'
import { Todo } from '@/components/interfaces'
import useTodo from '@/components/context/TodoProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { TodoSchema } from '../../schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const TodoForm = () => {
  const { setTodo, addTodo } = useTodo()
  const [input_value, setInput_Value] = useState("")

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: ""
    }
})

  // const formSubmit = async (f: FormEvent) => {
  //   const response = await fetch("http://localhost:8000/todos", {
  //     method: "POST",
  //     headers: {
  //       "request-mode": "no cors",
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify({ "content": input_value })
  //   })
  //   const data: Todo = await response.json()
  //   if (data) {
  //     addTodo(data)
  //   }
  //   f.preventDefault();
  //   setInput_Value("")
  // }
  return (
    <div className=''>
                      <Form  {...form}>
                    <form
                        className='space-y-5'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Todos
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Ahsaan Abbasi'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit" className='w-full'>Add Todo</Button>
                    </form>
                </Form>
      {/* <TodoItem /> */}
    </div>
  )
}

export default TodoForm