import { Result, StudentResult } from './result.models';

export interface Student {
  id?: number;
  name: string;
  address: string;
  date: Date;
}

export interface StudentInfo {
  id: number;
  dateOfBirth: Date;
  majorName: string;
  name: string;
  results: StudentResult[];
  completed: number;
  debt: number;
  gpa: number;
}

export interface StudentClass {
  id: number;
  dateOfBirth: Date;
  majorName: string;
  name: string;
  completed: number;
  debt: number;
  gpa: number;
  scoreLetter: string;
  scoreNumberOne: number | string;
  scoreNumberThree: number | string;
  scoreNumberTwo: number | string;
  scoreTotal: number | string;
}
