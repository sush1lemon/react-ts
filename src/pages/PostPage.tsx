import {Avatar, Paper} from "@mantine/core";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Post} from "../types/post.d";
import useSubReddit from "../hooks/useSubReddit";
import ax from "../api/axios";
import {Loading, PostContainer} from "../components/post";
import {User} from "../types/user.d";
import {Empty} from "../components/post/Empty";
import {CommentSection, CreateCommentSection} from "../components/comment";

export const PostPage = () => {
  const {postId} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { subReddit } = useSubReddit()

  useEffect(() => {
    const controller = new AbortController;

    if (subReddit !== null) {
      setLoading(true);
      setLoaded(false);
      ax.get(`/post/${postId}?sub=${subReddit?._id}`)
        .then(({data}) => {
          setPost(data);
        })
        .finally(() => {
          setLoading(false);
          setLoaded(true);
        })
    }

    return () => controller.abort();
  }, [subReddit]);

  return (
    <div className="flex gap-4">

      <div className="mt-4 flex-1 flex flex-col gap-2">
        {
          loading ? <Loading></Loading> :
            loaded && post ?
            <PostContainer postedBy={post?.user_id as User} post={post as Post}
                           createCommentSection={<CreateCommentSection/>}
                           commentSection={<CommentSection/>}/>
              : <Empty></Empty>
        }
      </div>

      <div className="w-72 hidden lg:block mt-4">
        <Paper>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-2">
              <Avatar size="md" radius="xl"/>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}
