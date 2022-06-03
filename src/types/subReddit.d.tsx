interface SubReddit{
  _id?: object;

  name: string;

  description: string;

  type: 'public' | 'restricted' | 'private';

  nsfw: boolean;

  members: number;

  topic?: Array<any>;

  created_at: Date;

  moderators: Array<any>;
}

interface SubRedditSelectItem {
  image: string,
  label: string;
  value: any;
}

export type { SubReddit, SubRedditSelectItem }
