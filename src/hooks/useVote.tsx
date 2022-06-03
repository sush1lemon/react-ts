import useAxios from "./useAxios";
import {PostVote} from "../types/post.d";

export const useVote = () => {
  const axios = useAxios();
  return (vote: PostVote) => {
    return axios.post('/post-vote', vote)
  }
}
