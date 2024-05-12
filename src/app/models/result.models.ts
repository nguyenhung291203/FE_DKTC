import { Student } from './student.models';

export interface Result {
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
  students: Student[];
}

export interface StudentResult {
  codeCourse: string;
  nameCourse: string;
  scoreLetter: string;
  scoreNumberOne: number;
  scoreNumberThree: number;
  scoreNumberTwo: number;
  scoreTotal: number;
}
