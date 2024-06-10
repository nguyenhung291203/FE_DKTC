import { Role } from './role.models';

export interface User {
  id: number;
  username: string;
  email?: string;
  password: string;
  roles: Role[];
}
