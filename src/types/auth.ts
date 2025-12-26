export interface UserTokenPayload {
  user_id: string;
  user_name: string;
  auth_provider: string;
  iat?: number;
  exp?: number;
}
