import {AuthenticatedUser} from "../../types/user.d";

export interface AuthContextInterface {
  user: AuthenticatedUser | null;
  setAuthenticatedUser: (value : AuthenticatedUser) => void,
  authenticate: (username: string, password: string) => Promise<AuthenticatedUser> | void,
  authenticating: boolean,
  logout: () => Promise<any> | void
}

export const AuthContextDefault : AuthContextInterface = {
  user: null,
  setAuthenticatedUser: () => {},
  authenticate: () => {},
  authenticating: false,
  logout: () => {}
}
