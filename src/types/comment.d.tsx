interface Comment {
  _id: object;

  post_id: object;

  user_id: CommentUser;

  subReddit_id: object;

  content: string;

  parent_id?: object | null;

  upVotes?: number;

  downVotes?: number;

  created_at?: Date;

  comments?: Comments;
}

type Comments = Comment[]

interface CommentUser{
  _id: string,
  username: string,
  firstName: string,
  lastName: string
}

export type { Comment, Comments }
