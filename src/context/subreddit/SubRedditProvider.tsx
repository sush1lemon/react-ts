import {createContext, FC, ReactNode, useEffect, useState} from "react";
import {SubRedditContextDefault, SubRedditContextInterface} from "./SubRedditContext";
import {SubReddit} from "../../types/subReddit.d";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../api/axios";


interface Props {
  children?: ReactNode;
}


const SubRedditContext = createContext<SubRedditContextInterface>(SubRedditContextDefault)

export const SubRedditProvider: FC<Props> = ({children}) => {
  const [subReddit, setSubReddit] = useState<SubReddit | null>(null);
  const {name} = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const controller = new AbortController();
    axios.get<SubReddit>(`/subreddit/name/${name}`, {
      signal: controller.signal
    })
      .then(({data}) => {
        if (data) {
          setSubRedditData(data);
        } else {
          navigate('/page-not-found')
        }
      })

    return () => controller.abort();
  }, [])

  const setSubRedditData = (value: SubReddit) => {
    setSubReddit(value);
  }

  return (
    <SubRedditContext.Provider value={{subReddit, setSubRedditData}}>
      {children}
    </SubRedditContext.Provider>
  );
};

export default SubRedditContext;
