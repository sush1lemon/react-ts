import useAxios from "../hooks/useAxios";
import {useEffect, useState} from "react";
import {User} from "../types/user.d";
import {UserItem} from "../components/user/UserItem";
import {Spinner} from "../components/Spinner";

const Users = () => {

  const axios = useAxios()
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get<User[] | null>('/user')
      .then(({ data }) => {
        if (data) {
          setUsers(data)
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);


  return (
    <div className="flex flex-col px-6 py-8 gap-2">
      <div>
        <h1 className="font-bold text-3xl">Users</h1>
      </div>
      {
        loading ? <Spinner/> :
          <div className="grid grid-cols-12 gap-8 mt-4" style={{gridAutoRows: "1fr"}}>
            {users.map((user) => <UserItem key={user._id as string} user={user}></UserItem>)}
          </div>
      }
    </div>
  )
}


export default Users;
