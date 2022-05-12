import useAuth from "../hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RouteGuard = () => {
  const { user } = useAuth()
  const location = useLocation()
  return (
    user?.access_token ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RouteGuard;
