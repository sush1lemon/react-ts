import React, {useEffect, useState} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import {Outlet} from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken()
  const {user} = useAuth()

  useEffect(() : any => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !user?.access_token ? verifyRefreshToken() : setIsLoading(false);
    return () => isMounted = false;
  }, [])

  return (
    <>
      {isLoading
        ? ''
        : <Outlet/>
      }
    </>
  )
}

export default PersistLogin
