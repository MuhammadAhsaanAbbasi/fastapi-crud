"use client"
import { FormEvent, useRef, useState, useTransition } from 'react'
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
import { useRouter } from 'next/navigation'
import { addTodos } from '@/lib/todos'


const TodoForm = () => {
  const { setTodo, addTodo } = useTodo()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
    try {
      const data = await addTodos(values);
      if(data){
        addTodo(data)
        console.log(data)
      }
      else {
        startTransition(() => {
            router.refresh()
        })
    }
    } catch (error) {
      console.log(error)
    }
    form.reset();
    router.refresh()
  }
  return (
    <div className=''>
      <Form  {...form}>
        <form
          className='space-y-5'
          onSubmit={form.handleSubmit((onSubmit))}
          >
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
      <TodoItem />
    </div>
  )
}

export default TodoForm