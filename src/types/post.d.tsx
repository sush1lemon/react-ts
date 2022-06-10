import {User} from "./user.d";
import {SubReddit} from "./subReddit.d";
import {Comment} from "./comment.d";


export type CreatePost = Omit<Post, "id" | "upVotes" | "downVotes" | "commentCount" | "createdAt" | "userId">

/**
 * Model Post
 *
 */
export type Post = {
  id: string
  title: string
  content: string | null
  upVotes: number
  downVotes: number
  commentCount: number
  createdAt: Date
  subRedditId: string
  userId: string
  user?: User
  subReddit?: SubReddit
  comments?: Comment[]
}


/**
 * Model PostVote
 *
 */
export type PostVote = {
  id: string
  postId: string
  userId: string
  vote: Vote
  lastVote: Vote
}


const Vote = {
  upVote: 'upVote',
  downVote: 'downVote'
};

export type Vote = (typeof Vote)[keyof typeof Vote]

export type CreatePostVote = Omit<PostVote, "id" | "lastVote" | "userId">
