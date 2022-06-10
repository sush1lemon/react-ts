interface AuthenticatedUser {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  access_token: string,
}


interface User {
  id?: number,
  username: string,
  password?: string,
  firstName: string,
  lastName: string,
}

interface AdminUser extends AuthenticatedUser{
  role: "admin"
}
export type { AuthenticatedUser, AdminUser, User }
