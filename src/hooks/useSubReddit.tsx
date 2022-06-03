import SubRedditContext from "../context/subreddit/SubRedditProvider";
import {useContext} from "react";

const useSubReddit = () => {
  return useContext(SubRedditContext);
}
export default useSubReddit;
