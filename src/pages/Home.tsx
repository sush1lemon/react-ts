import {useEffect, useState} from "react";
import useAxios from "../hooks/useAxios";
import {Todo, Todos} from "../types/todo.d";
import {Link, useNavigate} from "react-router-dom";
import {axiosPrivate} from "../api/axios";
import TodoItem from "../components/todo";
import useAuth from "../hooks/useAuth";

const Home = () => {

  // const axios = useAxios()
  const { logout } = useAuth();
  const [todos, setTodos] = useState<Todos>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTodos = () => {
      axiosPrivate.get<Todos>('/user/todos')
        .then(({ data }) => {
          setTodos(data)
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

  return(
    <div className="flex">
      <div className="w-64 bg-cyan-500 h-screen flex flex-col items-center pt-20 gap-1">
        <Link className="py-4 bg-cyan-600 w-full flex justify-center font-bold text-white cursor-pointer hover:bg-cyan-600" to="/">
          Your Todos
        </Link>
        <div className="py-4 w-full flex justify-center font-bold text-white cursor-pointer hover:bg-cyan-600">
          Other
        </div>
        <div className="py-4 w-full flex justify-center font-bold text-white cursor-pointer bg-cyan-600" style={{marginTop: "auto"}} onClick={doLogout}>
          Logout
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="bg-gray-100 w-full h-20 flex items-center px-4 sticky"></div>
        <div className="p-4 flex flex-col">
          <div className="flex mb-4">
            <Link to="/new-todo">
              <button className="px-4 py-2 rounded bg-green-400 text-white">New</button>
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {todos.map((todo) => (
              <TodoItem todo={todo} key={todo._id as string} onClick={editTodo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
