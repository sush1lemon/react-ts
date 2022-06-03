import {useEffect, useState} from "react";
import useAxios from "../hooks/useAxios";
import {Todo, Todos} from "../types/todo.d";
import {Link, useNavigate} from "react-router-dom";
import TodoItem from "../components/todo";
import useAuth from "../hooks/useAuth";
import {Spinner} from "../components/Spinner";
import {Button} from "@mantine/core";

const _Home = () => {

  const axios = useAxios()
  const {logout} = useAuth();
  const [todos, setTodos] = useState<Todos>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const fetchUserTodos = () => {
      axios.get<Todos>('/user/todos')
        .then(({data}) => {
          setTodos(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchUserTodos()
  }, [])

  const editTodo = (todo: Todo) => {
    navigate(`/edit-todo/${todo._id}`)
  }

  const doLogout = async () => {
    await logout()
  }

  return (
    <div className="p-4 flex flex-col gap-2 px-6 py-8">
      <div>
        <h1 className="font-bold text-3xl">Todos</h1>
      </div>
      <div className="flex mb-4">
        <Link to="/new-todo">
          <Button color="cyan">TEST</Button>
          <button className="px-4 py-2 rounded bg-green-400 text-white">New Todo</button>
        </Link>
      </div>
      {
        loading ? <Spinner/> :
          todos.length > 0 ?
            <div className="grid grid-cols-12 gap-8" style={{gridAutoRows: "1fr"}}>
              {todos.map((todo) => (
                <TodoItem todo={todo} key={todo._id as string} onClick={editTodo}/>
              ))}
            </div> :
            <div className="flex justify-center items-center mt-20">
              <h1 className="text-3xl text-gray-600">You have nothing todo.</h1>
            </div>
      }
    </div>
  )
}

export default _Home
