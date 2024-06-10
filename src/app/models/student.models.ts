import { ClassStudent } from './classStudent.models';
import { JwtAuthResponse } from './jwtAuthResponse.models';
import { User } from './user.models';

export interface Student {
  id: string;
  name: string;
  dateOfBirth: Date;
  classStudent: ClassStudent;
  user: User;
}

export interface UserStudentResponse {
  id: string;
  name: string;
  dateOfBirth: Date;
  classStudent: ClassStudent;
  user: User;
  jwtAuthResponse: JwtAuthResponse;
}
