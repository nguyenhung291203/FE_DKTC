import { StudentInfo } from './student.models';
export interface ClassResponse {
  id: number;
  className: string;
  address: string;
  teacherName: string;
  courseName: string;
  time: string;
  startDate: Date;
  endDate: Date;
  size: number;
  registered: number;
  isOpen: boolean;
  students: StudentInfo[];
  credit:number;
  codeCourse:string;
}
