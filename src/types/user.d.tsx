interface AuthenticatedUser {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
  access_token: string,
}


interface User {
  _id?: string,
  username: string,
  password?: string,
  firstName: string,
  lastName: string,
}

interface AdminUser extends AuthenticatedUser{
  role: "admin"
}
export type { AuthenticatedUser, AdminUser, User }
