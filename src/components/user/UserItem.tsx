import {User} from "../../types/user.d";
import React from "react";

export const UserItem = ({ user } : Props) => {
  return(
    <div className="flex items-center flex-col gap-4 cursor-pointer p-8 col-span-12 md:col-span-3 border rounded">
      <div className="flex justify-center">
        <img className="cursor-pointer w-24 h-24 rounded-full" src={`https://picsum.photos/seed/${user.id}/200?grayscale`} alt="Rounded avatar"/>
      </div>
      <div className="font-bold">@{user.username}</div>
      <div>{user.firstName} {user.lastName}</div>
    </div>
  )
}

interface Props {
  user: User
}
