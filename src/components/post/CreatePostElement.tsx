import {Button, Divider, Paper, Select, TextInput, Title} from "@mantine/core";
import {RichTextEditor} from '@mantine/rte';
import React, {useEffect, useState} from "react";
import {useInputState} from "@mantine/hooks";
import {ChevronDown} from "tabler-icons-react";
import {SubRedditSelect} from "../selectItems";
import useSubReddit from "../../hooks/useSubReddit";
import {SubReddit, SubRedditSelectItem} from "../../types/subReddit.d";
import ax from "../../api/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {CreatePost, Post} from "../../types/post.d";
import useAxios from "../../hooks/useAxios";

export const CreatePostElement = () => {

  const [title, setTitle] = useInputState('');
  const [content, setContent] = useState('');
  const [selectedSR, setSelectedSR] = useState('');
  const {subReddit} = useSubReddit();
  const [subReddits, setSubReddits] = useState<SubRedditSelectItem[]>([]);
  const {name} = useParams();
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const axios = useAxios()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController;
    ax.get<SubReddit[]>('/subreddit', {
      signal: controller.signal
    })
      .then(({data}) => {
        setSubReddits([])
        for (let x = 0; x < data.length; x++) {
          const sr = data[x];
          const item: SubRedditSelectItem = {
            label: `r/${sr.name}`,
            image: '',
            value: JSON.stringify({id: sr.id, name: sr.name})
          }
          if (name) {
            if (name === sr.name) {
              setSubReddits(old => [...old, item])
              setSelectedSR(item.value)
            }
          } else {
            setSubReddits(old => [...old, item])
          }
        }
      })

    return () => controller.abort();
  }, [])

  useEffect(() => {
    setTitleError(false)
    setContentError(false)
  }, [title, content])

  const onChange = (v: any) => {
    setContent(v)
  }

  const onSelectCommunity = (v: any) => {
    const parsed = JSON.parse(v);
    if (!subReddit) {
      navigate(`/r/${parsed.name}/submit`);
    }
  }

  const createPost = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (!title) return setTitleError(true);
    if (content == '<p><br></p>') return setContentError(true);

    const data: CreatePost = {
      subRedditId: subReddit?.id as string,
      content: content,
      title: title,
    }

    setLoading(true)
    axios.post<Post>('/post', data)
      .then(({data}) => {
        navigate(`/r/${subReddit?.name}/comments/${data.id}/`);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="flex flex-col min-h">
      <Title order={3}>Create Post</Title>
      <Divider my="sm"/>

      <form onSubmit={createPost}>
        <div className="w-[70%] md:w-[50%] lg:w-[40%] mb-4">
          <Select
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            placeholder="Select Community"
            rightSection={<ChevronDown size={14}/>}
            rightSectionWidth={30}
            itemComponent={SubRedditSelect}
            styles={{rightSection: {pointerEvents: 'none'}}}
            data={subReddits}
            value={selectedSR}
            onChange={onSelectCommunity}
          />
        </div>
        <Paper>
          <div className="flex flex-col gap-4 p-2">
            <TextInput size="lg" placeholder="Title" value={title} onChange={setTitle} error={titleError}/>
            <RichTextEditor placeholder="Text (required)" onChange={onChange} value={content}/>
          </div>
          <div className="p-2 pt-0 pb-4">
            <Divider my="sm"/>
            <div className="flex gap-2 justify-end">
              <Link to={subReddit?.name ? `/r/${subReddit.name}` : '/'}>
                <Button radius="lg">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" radius="lg" disabled={loading || subReddit == null} loading={loading}>
                Post
              </Button>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  )
}
