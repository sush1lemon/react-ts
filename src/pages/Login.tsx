import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate} from "react-router-dom";

const Login = () => {

  type LocationProps = {
    state: {
      from: Location;
    };
  };

  const { authenticate, authenticating } = useAuth()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const login = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    authenticate(username, password)
      ?.then(() => {
        navigate(from, { replace: true});
      })
      .catch((e) => {
        const { data } = e.response;
        setErrMsg(data.message)
      })
  }

  return (
    <div className="h-screen w-full flex flex-row bg-white justify-end bg-cyan-400">
      <div className="basis-[100%] lg:basis-[40%] xl:basis-[30%] px-14 py-4 bg-white">
        <div className="mt-44 my-20">
          <h1 className="font-bold text-4xl">
            Login
          </h1>
          <span>Fill up the following fields to proceed</span>
        </div>
        <form className="flex flex-col gap-8" onSubmit={login}>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              Username
            </span>
            <input className="border rounded px-4 py-4 w-full" type="text" value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              Password
            </span>
            <input className="border rounded px-4 py-4 w-full" type="password" value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="text-red-400">
            {
              errMsg && errMsg
            }
          </div>
          <button disabled={authenticating} type="submit"
            className="bg-green-500 py-4 rounded font-bold text-white disabled:opacity-50 disabled:cursor-progress">Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
