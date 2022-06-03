import {SubRedditProvider} from "../../context/subreddit/SubRedditProvider";
import {Outlet} from "react-router-dom";

export const SubRedditLayout = () => {
  return (
    <SubRedditProvider>
      <Outlet/>
    </SubRedditProvider>
  )
}
