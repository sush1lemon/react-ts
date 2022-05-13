import {NavLink, Route, Routes} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TodoForm from "../todo/TodoForm";
import React, {useState} from "react";
import Home from "../../pages/Home";
import Users from "../../pages/Users";
import "./burger.css"

const HomeLayout = () => {

  const {logout, user} = useAuth();
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const doLogout = async () => {
    await logout()
  }

  const handleClick = (e: any) => {
    setSidebarHidden(!sidebarHidden)
  }

  return (
    <div className="flex">
      <div className="-sidebar" style={sidebarHidden ? {display: "none"} : {display : "flex"}}>
        <div className="flex items-center justify-end h-20 w-full px-2">
          <div className="cursor-pointer change lg:hidden"  onClick={handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
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
        <div className="bg-gray-100 w-full h-20 flex items-center justify-between px-4 sticky top-0">
          <div className="inline cursor-pointer" onClick={handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className="flex gap-4 items-center float-right">
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
