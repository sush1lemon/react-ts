import {CreatePostMini, Loading, PostContainer} from "../components/post";
import {Empty} from "../components/post/Empty";
import {User} from "../types/user.d";
import {Avatar, Paper, Text} from "@mantine/core";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import {useEffect, useState} from "react";
import {Post} from "../types/post.d";
import useSubReddit from "../hooks/useSubReddit";

export const SubRedditHome = () => {
  const {user} = useAuth();
  const {subReddit} = useSubReddit();
  const axios = useAxios();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const controller = new AbortController();
    if (subReddit) {
      axios.get<Post[]>(`/post?subreddit=${subReddit?._id}`, {
        signal: controller.signal
      })
        .then(({data}) => {
          setPosts(data);
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return () => controller.abort();
  }, [subReddit])

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
                  <PostContainer post={post} postedBy={post.user_id as User} key={post._id as any as string}/>
                )
          }
        </div>
      </div>
      <div className="w-72 hidden lg:block mt-4">
        <Paper>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-2">
              <Avatar size="md" radius="xl"/>
              <Text>r/{ subReddit?.name }</Text>
            </div>
            <div> { subReddit?.description }</div>
          </div>
        </Paper>
      </div>
    </div>
  )
}
