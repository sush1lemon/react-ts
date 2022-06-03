import {CreatePostMini, Loading, PostContainer} from "../components/post";
import useAuth from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {Post} from "../types/post.d";
import {Empty} from "../components/post/Empty";
import useAxios from "../hooks/useAxios";
import {User} from "../types/user.d";
import {Paper} from "@mantine/core";


export const Home = () => {
  const {user} = useAuth();
  const axios = useAxios();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios.get<Post[]>('/post', {
      signal: controller.signal
    })
      .then(({ data }) => {
        setPosts(data);
      })
      .finally(() => {
        setLoading(false)
      })

    return ()=> controller.abort();
  }, [])

  return (
    <div className="flex gap-4">
      <div className="mt-4 flex-1 flex flex-col gap-2 pb-2">
        {
          user && <CreatePostMini/>
        }
        <div className="flex flex-col items-center gap-2 mt-2">
          {
            loading ? <Loading/> :
              posts.length === 0 ? <Empty/> :
                posts.map((post) =>
                  <PostContainer post={post} postedBy={post.user_id as User} community={post.subReddit_id.name} key={post._id as any as string}  />
                )
          }
        </div>
      </div>
      <div className="w-72 hidden lg:block mt-4">
        <Paper>asd</Paper>
      </div>
    </div>
  )
}
