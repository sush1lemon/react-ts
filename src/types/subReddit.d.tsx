import {SubRedditType} from "./prisma.d";

export type SubReddit = {
  id: string
  name: string
  description: string | null
  type: SubRedditType
  nsfw: boolean
  members: number
  createdAt: Date
}

/**
 * Model SubRedditMember
 *
 */
export type SubRedditMember = {
  id: string
  userId: string
  subRedditId: string
}

export type SubRedditSelectItem = {
  image: string,
  label: string;
  value: any;
}
