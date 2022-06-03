import {CreatePostElement} from "../components/post";
import {Avatar, Paper, Text} from "@mantine/core";

export const Submit = () => {
  return (
    <div className="flex gap-4">

      <div className="mt-4">
        <CreatePostElement></CreatePostElement>
      </div>

      <div className="w-72 hidden lg:block mt-4">
        <Paper>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-2">
              <Avatar size="md" radius="xl"/>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}
