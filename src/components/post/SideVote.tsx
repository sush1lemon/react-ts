import {MediaQuery, Paper, Text, useMantineTheme} from "@mantine/core";
import {ArrowBigDown, ArrowBigTop} from "tabler-icons-react";
import {useVote} from "../../hooks/useVote";
import useSubReddit from "../../hooks/useSubReddit";
import {PostVote, Vote} from "../../types/post.d";
import useAuth from "../../hooks/useAuth";
import {useState} from "react";

export const SideVote = ({count, vote, post_id}: Props) => {
  const theme = useMantineTheme();
  const votePost = useVote()
  const {subReddit} = useSubReddit();
  const {user} = useAuth();
  const [votes, setVotes] = useState(count);
  const [userVote, setUserVote] = useState(vote);

  const defaultColor = theme.colorScheme == 'dark' ? theme.white : theme.black;


  const castVote = (vote: Vote) => {
    const data: PostVote = {
      vote: vote,
      post_id: post_id
    }
    votePost(data)
      .then(({data}) => {
        const nvr = votes as number + data.voteResult
        const nv = vote == userVote ? undefined : vote;
        setUserVote(nv)
        setVotes(nvr);
      })
    return undefined;
  }
  return (
    <MediaQuery smallerThan="sm" styles={{display: 'none'}}>
      <Paper className="flex-none w-10 flex flex-col items-center p-4 bg-gray-200" sx={theme => ({
        display: 'flex',
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.blue[7],
        borderRadius: 0
      })}>
        <ArrowBigTop className="cursor-pointer" strokeWidth={1} size={28}
                     color={userVote == 'upVote' ? theme.colors.blue[9] : defaultColor}
                     onClick={() => castVote('upVote')}/>
        <Text size={"sm"} weight={400}>{votes ?? 0}</Text>
        <ArrowBigDown className="cursor-pointer" strokeWidth={1} size={28}
                      color={userVote == 'downVote' ? theme.colors.orange[9] : defaultColor}
                      onClick={() => castVote('downVote')}/>
      </Paper>
    </MediaQuery>
  )
}

interface Props {
  count?: number;
  vote?: Vote;
  post_id: object;
}
