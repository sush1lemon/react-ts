import {User} from "./user.d";

/**
 * Model Comment
 *
 */
export type Comment = {
  id: string
  postId: string
  userId: string
  content: string
  upVotes: number
  downVotes: number
  createdAt: Date
  parentId: string | null
  comments?: Comment[],
  user?: User,
}
