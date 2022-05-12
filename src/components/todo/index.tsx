import {Todo} from "../../types/todo.d";
import React from "react";

const TodoItem = ({ todo, onClick } : Props) => {
  return (
    <div className="flex flex-col gap-1 cursor-pointer" onClick={() => onClick(todo)}>
      <h1 className="font-bold">{todo.title}</h1>
      <p>{todo.content}</p>
      <div>
        <b>Status:</b> { todo.status ? 'Ongoing' : 'Finished'}
      </div>
    </div>
  )
}

interface Props {
  todo: Todo,
  onClick: Function
}

export default TodoItem
