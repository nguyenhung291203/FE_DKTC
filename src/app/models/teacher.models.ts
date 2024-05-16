import { ClassResponse } from './class.models';

export interface Teacher {
  id: number;
  name: string;
  majorName: string;
}

export interface TeacherInfo {
  id: number;
  name: string;
  majorName: string;
  classes: ClassResponse[];
}
