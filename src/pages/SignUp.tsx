import {Link} from "react-router-dom";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {User} from "../types/user.d";
import axios from "../api/axios";

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrMsg("")
  }, [username, password, firstName, lastName])

  const register = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (!(username && password && firstName && lastName)) {
      return setErrMsg('Please fill up the form.')
    }

    const user: User = {
      firstName: firstName, lastName: lastName,
      username,
      password
    }
    setLoading(true)
    setErrMsg("")
    setSuccessMsg("")
    await axios.post('/user', user)
      .then(() => {
        setErrMsg("")
        setUsername("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setSuccessMsg('Registration success!')
      })
      .catch((err) => {
        const {response} = err;
        if (response?.data?.message) {
          setErrMsg(response.data.message)
        } else {
          setErrMsg('Error on creating user')
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }


  return (
    <div className="min-h-screen w-full flex flex-row bg-white justify-end bg-cyan-400">
      <div className="basis-[100%] lg:basis-[40%] xl:basis-[30%] px-14 py-4 bg-white">
        <div className="mt-20 my-20">
          <h1 className="font-bold text-4xl">
            Sign up
          </h1>
          <span>Fill up the following fields to proceed</span>
        </div>
        <form className="flex flex-col gap-8" onSubmit={register}>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              Username
            </span>
            <input className="border rounded px-4 py-4 w-full" type="text" value={username}
                   onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              First Name
            </span>
            <input className="border rounded px-4 py-4 w-full" type="text" value={firstName}
                   onChange={e => setFirstName(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              Last Name
            </span>
            <input className="border rounded px-4 py-4 w-full" type="text" value={lastName}
                   onChange={e => setLastName(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-[#606266]">
              Password
            </span>
            <input className="border rounded px-4 py-4 w-full" type="password" value={password}
                   onChange={e => setPassword(e.target.value)}/>
          </div>
          {
            errMsg && <div className="text-red-400 font-bold">{errMsg}</div>
          }
          {
            successMsg && <div className="text-green-400 font-bold">{successMsg}</div>
          }
          <button disabled={loading} type="submit"
                  className="bg-green-500 py-4 rounded font-bold text-white disabled:opacity-50 disabled:cursor-progress">Signup
          </button>
          <Link to="/login"
                className="border  text-[#606266] flex justify-center py-4 rounded font-bold disabled:opacity-50 disabled:cursor-progress">
            Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp
