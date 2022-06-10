import {useEffect, useState} from "react";
import {NoComment} from "./NoComment";
import {CommentElement} from "./CommentElement";
import ax from "../../api/axios";
import {useParams} from "react-router-dom";
import {Loading} from "../post";
import {Comment} from "../../types/comment.d";

export const CommentSection = () => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const { postId } = useParams()

  useEffect(() => {
    const controller = new AbortController;
    setLoading(true);
    ax.get<Comment[]>(`/comment/post/${postId}`, {
      signal: controller.signal
    })
      .then(({data}) => {
        setComments(data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      })


    return () => controller.abort()
  }, [])

  return (
    <div className="flex flex-col gap-1 py-2">
      {
        loading ? <Loading/> :
        comments.length === 0 ? <NoComment/> :
          comments.map((comment) => (
            <CommentElement level={1} key={comment.id} comment={comment} />
          ))
      }
    </div>
  )
}
