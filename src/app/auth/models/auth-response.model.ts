export interface AuthResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  roles: string[];
}
