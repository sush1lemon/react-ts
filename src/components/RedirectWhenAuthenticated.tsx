import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";

const RouteGuard = () => {
  const { user } = useAuth()
  return (
    user?.access_token ? <Navigate to="/" /> : <Outlet/>
  )
}

export default RouteGuard;
