import {Todo} from "../../types/todo.d";
import React from "react";

const TodoItem = ({todo, onClick}: Props) => {
  return (
    <div className="cursor-pointer col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 border rounded relative" onClick={() => onClick(todo)}>
      <div className="grid h-full">
        <div className="flex  p-8  flex-col gap-2 z-10" style={{gridArea: "1/1/auto/auto"}}>
          <h1 className="font-bold">{todo.title}</h1>
          <p className="whitespace-pre-line">{todo.content}</p>
          <div>
            <b>Status:</b> {todo.status ? (<span className="text-blue-600">Ongoing</span>) : (
            <span className="text-green-600">Finished</span>)}
          </div>
        </div>
        <div className={todo.status ? 'relative bg-blue-400 w-full' : 'relative bg-green-400 w-full'}
             style={{gridArea: "1/1", clipPath: "polygon(100% 0, 70% 0, 100% 54%)"}}></div>
      </div>
    </div>
  )
}

interface Props {
  todo: Todo,
  onClick: Function
}

export default TodoItem
