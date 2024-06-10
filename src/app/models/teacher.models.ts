import { JwtAuthResponse } from './jwtAuthResponse.models';
import { Unit } from './unit.models';
import { User } from './user.models';

export interface Teacher {
  id: string;
  name: string;
  unit: Unit;
  position: string;
  user: User;
}

export interface UserTeacherResponse {
  id: string;
  name: string;
  unit: Unit;
  position: string;
  user: User;
  jwtAuthResponse: JwtAuthResponse;
}
