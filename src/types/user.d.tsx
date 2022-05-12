interface AuthenticatedUser {
  id: string,
  first_name: string,
  last_name: string,
  access_token: string,
}
interface AdminUser extends AuthenticatedUser{
  role: "admin"
}
export type { AuthenticatedUser, AdminUser }
