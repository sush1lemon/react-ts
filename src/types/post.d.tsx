interface Post {
  _id: object;

  user_id: object;

  subReddit_id: any;

  title: string;

  content?: string;

  flairs?: Array<any>;

  upVotes: number;

  downVotes: number;

  comments: number;

  created_at: Date;
}

interface CreatePost {
  subReddit_id: any;

  title: string;

  content: string;

  flairs?: Array<any>;
}

interface PostVote {
  vote: Vote,
  user_id?: string,
  post_id: object
}

type Vote = 'upVote' | 'downVote';
export type {Post, CreatePost, PostVote, Vote}
