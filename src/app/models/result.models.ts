import { Student } from './student.models';

export interface Result {
  id: number;
  className: string;
  address: string;
  teacherName: string;
  nameCourse: string;
  time: string;
  startDate: Date;
  endDate: Date;
  size: number;
  registered: number;
  students: Student[];
  scoreId: number;
}

export interface StudentResult {
  id: number;
  dateOfBirth: Date;
  majorName: string;
  nameCourse: string;
  codeCourse: string;
  name: string;
  result: StudentResult;
  completed: number;
  debt: number;
  gpa: number;
  scoreLetter: string;
  scoreNumberOne: number;
  scoreNumberThree: number;
  scoreNumberTwo: number;
  scoreTotal: number;
}
