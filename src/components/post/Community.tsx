import {Avatar, Text} from "@mantine/core";
import {Link} from "react-router-dom";

export const Community = ({community}: Props) => {
  const test = () => {
    console.log(test);
  }
  return (
    <>
      <Avatar size="sm" radius="xl"/>
      <Link to={`/r/${community}`} onClick={test}>
        <Text variant="link" component="span" color="black" weight={500} className="cursor-pointer">r/{community}</Text>
      </Link>
      ·
    </>
  )
}

interface Props {
  community: string;
}
