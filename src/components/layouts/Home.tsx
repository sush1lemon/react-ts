import {NavLink, Route, Routes} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TodoForm from "../todo/TodoForm";
import React from "react";
import Home from "../../pages/Home";
import Users from "../../pages/Users";

const HomeLayout = () => {

  const {logout, user} = useAuth();
  const doLogout = async () => {
    await logout()
  }

  return (
    <div className="flex">
      <div className="w-64 bg-cyan-500 h-screen flex flex-col items-center pt-20 gap-1 sticky top-0">
        <NavLink className={
          isActive => "-nav-link " + (isActive.isActive ? " bg-cyan-600" : "")
        }
          to="/">
          Your Todos
        </NavLink>
        <NavLink to="/users" className={
          isActive => "-nav-link " + (isActive.isActive ? " bg-cyan-600" : "")
        }>
          Users
        </NavLink>
        <div className="py-4 w-full flex justify-center font-bold text-white cursor-pointer bg-cyan-600"
             style={{marginTop: "auto"}} onClick={doLogout}>
          Logout
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="bg-gray-100 w-full h-20 flex items-center justify-end px-4 sticky top-0">
          <div className="flex gap-4 items-center">
            <div className="font-bold">{ user?.first_name} { user?.last_name }</div>
            <img className="cursor-pointer w-10 h-10 rounded-full" src="https://picsum.photos/200?grayscale" alt="Rounded avatar"/>
          </div>
        </div>
        <div className="p-4 flex flex-col">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/new-todo" element={<TodoForm/>}></Route>
            <Route path="edit-todo/:id" element={<TodoForm/>}></Route>
            <Route path="/users" element={<Users/>}></Route>
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default HomeLayout
