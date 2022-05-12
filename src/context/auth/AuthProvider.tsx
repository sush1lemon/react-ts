import React, {useState, FC, createContext, ReactNode} from 'react';
import {AuthenticatedUser} from "../../types/user.d";
import {AuthContextDefault, AuthContextInterface} from "./AuthContext";
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";

const AUTH_URL = "/user/login";
const LOGOUT_URL = "/user/logout";

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthContext = createContext<AuthContextInterface>(AuthContextDefault);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setAuth] = useState<AuthenticatedUser | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  const setAuthenticatedUser = (value : AuthenticatedUser) => {
    setAuth(value)
  }

  const authenticate = (username: string, password: string) : Promise<AuthenticatedUser> | void =>{
    if (!authenticating) {
      setAuthenticating(true)
      return new Promise((resolve, reject) => axios.post<AuthenticatedUser>(AUTH_URL, {username, password}, {
        withCredentials: true,
      })
        .then(({ data }) => {
          if (data) {
            setAuthenticatedUser(data)
          }
          resolve(data)
        })
        .catch(reject)
        .finally(() => {
          setAuthenticating(false)
        }))
    }
  }

  const logout = () : Promise<any> => {
    return new Promise((resolve, reject) => axios.get(LOGOUT_URL, {
      withCredentials: true
    })
      .then(resolve)
      .catch(reject)
      .finally(() => {
        setAuth(null)
      }))
  }

  return (
    <AuthContext.Provider value={{setAuthenticatedUser, authenticate, logout, user, authenticating}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext
