import {Avatar, Button, Divider, Text, TypographyStylesProvider} from "@mantine/core";
import React, {useState} from "react";
import {Comments, Comment} from "../../types/comment.d";
import {ActionButton} from "../post/ActionButton";
import {Message} from "tabler-icons-react";
import {CreateCommentSection} from "./CreateCommentSection";

export const CommentElement = ({ comment , level }: Props) => {
  const [showCreateComment, setShowCreateComment] = useState(false);
  return (
    <div className="ml-1 mt-1">
      <div className="flex">
        <div className="flex-none w-10 flex justify-center p-4 py-1">
          <Avatar radius="xl" size={32}></Avatar>
        </div>
        <div className="flex-1 flex items-center">
          <Text size="sm">{comment.user_id.username}</Text>
          <br/>
        </div>
      </div>
      <div className="flex">
        <div className="flex-none flex justify-center p-5 py-1 pr-2">
          <Divider sx={{ height: '100%' }} orientation="vertical" />
        </div>
        <div className="flex-1 flex flex-col">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: comment.content as string }} />
          </TypographyStylesProvider>
          <div className="flex items-center">
            <ActionButton text="Reply" icon={<Message size={24}/>} onClick={()=> setShowCreateComment(true)} />
            <ActionButton text="Report"/>
          </div>

          <div>
            {
              showCreateComment &&
              <CreateCommentSection submitText="Reply" hideUsername={true} parent_id={comment._id as any as string} cancelButton={
                <Button type="button" radius="lg" onClick={() => setShowCreateComment(false)}>
                  Cancel
                </Button>
              }/>
            }
          </div>
          {
            comment.comments && comment.comments.map((comment) => (
              <CommentElement level={level+1} key={comment._id as any as string} comment={comment}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

interface Props {
  comment: Comment,
  level: number
}
