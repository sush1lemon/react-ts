import axios from '../api/axios';
import useAuth from './useAuth';
import {AuthenticatedUser} from "../types/user.d";

const REFRESH_URL = '/auth/refresh';

const useRefreshToken = () => {
  const {setAuthenticatedUser} = useAuth();

  const refresh = async () => {
    const response = await axios.get<AuthenticatedUser>(REFRESH_URL, {
      withCredentials: true
    });
    setAuthenticatedUser(response.data);
    return response.data.access_token;
  }
  return refresh;
};

export default useRefreshToken;
