import {Avatar, Divider, Paper, Text, Title, TypographyStylesProvider} from "@mantine/core";
import {SideVote} from "./SideVote";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../../types/user.d";
import { Post } from "../../types/post.d";
import {Community} from "./Community";
import ReactTimeAgo from "react-time-ago";
import {Gift, Message} from "tabler-icons-react";
import {ActionButton} from "./ActionButton";
import {RichTextEditor} from "@mantine/rte";
import React from "react";
import useAuth from "../../hooks/useAuth";


export const PostContainer = ({ community, post, postedBy, createCommentSection, commentSection }: Props) => {
  const navigate = useNavigate();
  const { name } = useParams()
  const { user } = useAuth()

  const goToPost = () => {
    const sr = community ?? name;
    navigate(`/r/${sr}/comments/${post._id}`)
  }

  return(
    <Paper className="w-full cursor-pointer">
      <div className="flex">
        <SideVote count={post.upVotes - post.downVotes} post_id={post._id}/>
        <Link className="w-full" to={`/r/${community ?? name}/comments/${post._id}`}>
          <div className="flex-1 p-4 sm:pl-2 flex flex-col pb-0.5">
            <div className="flex items-center gap-1 gap-y-2 py-1 flex-wrap">
              {
                community && <Community community={community}/>
              }
              <Text size="sm" color="gray">
                Posted by <Link to={`/u/${postedBy.username}`}><Text variant="link" component="span"  color="gray" className="cursor-pointer">u/{postedBy.username}</Text></Link>
              </Text>
              <Text size="sm" color="gray">
                <ReactTimeAgo date={Date.parse(post.created_at as any as string)} locale="en-US"/>
              </Text>
            </div>
            <Title className="px-1" order={3}>{ post.title }</Title>
            <div className="my-4 px-1">
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
              </TypographyStylesProvider>
            </div>
            <div className="flex items-center">
              <ActionButton text={`${ post.comments } ${ post.comments > 2 ? 'Comments' : 'Comment' }`} icon={<Message/>}/>
              <ActionButton text="Award" icon={<Gift/>}/>
            </div>
          </div>
        </Link>
      </div>
      {
        createCommentSection
      }
      {
        commentSection &&
        <>
          <Divider my="sm"/>
          {commentSection}
        </>
      }
    </Paper>
  )
}

interface Props {
  community?: string;
  postedBy: User;
  post: Post;
  createCommentSection?: JSX.Element;
  commentSection?: JSX.Element;
}
