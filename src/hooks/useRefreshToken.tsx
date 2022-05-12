import axios from '../api/axios';
import useAuth from './useAuth';
import {AuthenticatedUser} from "../types/user.d";

const useRefreshToken = () => {
  const {setAuthenticatedUser} = useAuth();

  const refresh = async () => {
    const response = await axios.get<AuthenticatedUser>('/user/refresh', {
      withCredentials: true
    });
    setAuthenticatedUser(response.data);
    return response.data.access_token;
  }
  return refresh;
};

export default useRefreshToken;
