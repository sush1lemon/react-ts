import React, {SyntheticEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {Todo} from "../../types/todo.d";

const TodoForm = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const axios = useAxios()
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const setEditData = () => {
      axios.get<Todo | null>(`/todo/${id}`)
        .then(({data}) => {
          if (!data) {
            navigate('/')
          } else {
            setTitle(data.title)
            setContent(data.content)
            setStatus(data.status)
          }
        })
    }
    id && setEditData()
  }, [])

  useEffect(() => {
    setErrorMsg("")
  }, [title, content]);


  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data: Todo = {
      title: title,
      content: content,
      status: status
    }
    if (!(title && content)) return setErrorMsg("Please fill up fields.");
    if (id) {
      await updateTodo(data)
    } else {
      await newTodo(data)
    }
  }

  const newTodo = async (data: Todo) => {
    await axios.post('/todo', data)
      .then(() => {
        navigate('/');
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateTodo = async (data: Todo) => {
    await axios.put(`/todo/${id}`, data)
      .then(() => {
        navigate('/')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deleteTodo = async () => {
    await axios.delete(`/todo/${id}`)
      .then(() => {
        navigate('/')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="basis-[30%] flex flex-col gap-3">
        <div className="flex justify-end">
          <Link to="/" className="font-medium cursor-pointer">
            Go Back
          </Link>
        </div>
        <div className="border p-10">
          <form className="flex flex-col gap-8" onSubmit={submitForm}>
            <div className="flex flex-col gap-2">
              <span className="text-lg text-[#606266]">
                Title
              </span>
              <input className="border rounded px-4 py-4 w-full" type="text" value={title}
                     onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg text-[#606266]">
                Content
              </span>
              <textarea className="border rounded px-4 py-4 w-full h-64" value={content}
                        onChange={(e) => setContent(e.target.value)}/>
            </div>
            { errorMsg && (<div className="text-red-400">errorMsg</div>) }
            <div className="flex justify-end items-center gap-2">
              <input type="checkbox" id="status" name="status" defaultChecked={!status} onChange={() => setStatus(false)}/>
              <label htmlFor="status">Mark as Done</label>
            </div>
            <div className="flex gap-4 justify-end">
              {
                id && <button type="button" disabled={loading}
                              className="self-end bg-red-400 px-12 py-4 rounded font-bold text-white disabled:opacity-50 disabled:cursor-progress"
                              onClick={deleteTodo}>Delete</button>
              }
              <button type="submit" disabled={loading}
                      className="self-end bg-green-500 px-12 py-4 rounded font-bold text-white disabled:opacity-50 disabled:cursor-progress">Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TodoForm
