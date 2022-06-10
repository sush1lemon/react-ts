import {Link, useParams} from "react-router-dom";
import {Button, Text} from "@mantine/core";
import {RichTextEditor} from "@mantine/rte";
import React, {useState} from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSubReddit from "../../hooks/useSubReddit";

export const CreateCommentSection = ({ parent_id, hideUsername, cancelButton, submitText }: Props) => {
  const {user} = useAuth()
  const axios = useAxios();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const {postId} = useParams();
  const {subReddit} = useSubReddit();

  const makeComment = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (comment == '<p><br></p>') return;

    setLoading(true);
    axios.post('/comment', {post_id: postId, content: comment, subReddit_id: subReddit?.id, parent_id})
      .finally(() => {
        setLoading(false);
        setComment('');
      })
  }

  return (
    <div className="md:pl-10 p-2 flex flex-col gap-1">
      {
        !hideUsername &&
        <Link to={`/u/${user?.username}`}>
          <Text size="sm">Comment as <Text size="sm" variant="link" component="span">{user?.username}</Text></Text>
        </Link>
      }
      <form onSubmit={makeComment}>
        <RichTextEditor placeholder="Text (required)" onChange={setComment} value={comment}/>
        <div className="flex justify-end mt-1">
          <div className="flex justify-between gap-2">
            {
              cancelButton
            }
            <Button type="submit" radius="lg" disabled={loading} loading={loading}>
              {
                submitText || 'Comment'
              }
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

interface Props {
  parent_id?: string;
  hideUsername?: boolean;
  cancelButton?: JSX.Element
  ref?: any
  submitText?: string
}
