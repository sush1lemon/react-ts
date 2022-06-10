import useAxios from "./useAxios";
import {CreatePostVote} from "../types/post.d";

export const useVote = () => {
  const axios = useAxios();
  return (vote: CreatePostVote) => {
    return axios.post('/post-vote', vote)
  }
}
