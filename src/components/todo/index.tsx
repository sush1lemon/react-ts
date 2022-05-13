import {Todo} from "../../types/todo.d";
import React from "react";

const TodoItem = ({todo, onClick}: Props) => {
  return (
    <div className="flex flex-col gap-1 cursor-pointer p-8 col-span-4 border rounded" onClick={() => onClick(todo)}>
      <h1 className="font-bold">{todo.title}</h1>
      <p className="whitespace-pre-line">{todo.content}</p>
      <div>
        <b>Status:</b> {todo.status ? (<span className="text-blue-600">Ongoing</span>) : (<span className="text-green-600">Finished</span>)}
      </div>
    </div>
  )
}

interface Props {
  todo: Todo,
  onClick: Function
}

export default TodoItem
