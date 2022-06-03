import {CreatePostElement} from "../components/post";
import {Avatar, Paper, Text} from "@mantine/core";
import useSubReddit from "../hooks/useSubReddit";

export const SubRedditSubmit = () => {
  const {subReddit} = useSubReddit();

  return(
    <div className="flex gap-4">

      <div className="mt-4">
        <CreatePostElement></CreatePostElement>
      </div>

      <div className="w-72 hidden lg:block mt-4">
        <Paper>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-2">
              <Avatar size="md" radius="xl"/>
              <Text>r/{ subReddit?.name }</Text>
            </div>
            <div> { subReddit?.description }</div>
          </div>
        </Paper>
      </div>
    </div>
  )
}
