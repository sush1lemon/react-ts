import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RouteGuard from "./components/RouteGuard";
import Page404 from "./components/Page404";
import PersistLogin from "./components/PersistLogin";
import TodoForm from "./components/todo/TodoForm";
import RedirectWhenAuthenticated from "./components/RedirectWhenAuthenticated";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<PersistLogin/>}>
          <Route element={<RedirectWhenAuthenticated/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>

          <Route element={<RouteGuard/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/new-todo" element={<TodoForm/>}></Route>
            <Route path="/edit-todo/:id" element={<TodoForm/>}></Route>
          </Route>
        </Route>

        <Route path="*" element={<Page404/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
