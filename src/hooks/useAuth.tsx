import {useContext} from "react";
import AuthContext from "../context/auth/AuthProvider";

const useAuth = () =>{
  return useContext(AuthContext)
}

export default useAuth
