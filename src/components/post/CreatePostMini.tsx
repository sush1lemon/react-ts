import {Avatar, Input, Paper} from "@mantine/core";
import {Link, useNavigate, useParams} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const CreatePostMini = () => {

  const { user } = useAuth();
  const navigate = useNavigate()
  const { name } = useParams();

  const onClick = () => {
    if (name) {
      navigate(`/r/${name}/submit`)
    } else {
      navigate(`/submit`)
    }
  }

  return (
    <Paper className="p-2" withBorder={true}>
      <div className="flex gap-4 items-center w-full">
        <Link to={`/u/${user?.username}`}><Avatar className="inline-flex flex-none" size="lg" radius="xl" /></Link>
        <Input className="inline-flex flex-1" variant="default" size={"lg"} placeholder="Create Post" onClick={onClick} />
      </div>
    </Paper>
  )
}
