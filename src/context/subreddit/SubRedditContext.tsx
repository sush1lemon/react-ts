import {SubReddit} from "../../types/subReddit.d";

export interface SubRedditContextInterface{
  subReddit: SubReddit | null
  setSubRedditData: (value: SubReddit) => void
}

export const SubRedditContextDefault: SubRedditContextInterface = {
  subReddit: null,
  setSubRedditData: (value: SubReddit) => {}
}
