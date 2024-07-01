import { ClassSubject } from './classSubject.models';
import { Student } from './student.models';

export interface Point {
  id: {
    studentId: string;
    classesSubjectsId: string;
  };
  student: Student;
  classSubject: ClassSubject;
  scoreNumberOne: number | null;
  scoreNumberTwo: number | null;
  scoreNumberThree: number | null;
  scoreTotal: number | null;
  scoreLaster: number | null;
  scoreLetter: string | null;
  actived: boolean;
}

export interface PointExcel {
  STT: number;
  'Môn học': string;
  'Tín chỉ': number;
  'Điểm chuyên cần': number | null;
  'Điểm giữa kì': number | null;
  'Điểm thi': number | null;
  'Điểm môn học': number | null;
  'Thành chữ': string | null;
  'Hệ 4': number | null;
}

export interface PointExcelClassDetail{
  STT: number,
        'Mã số SV': string,
        'Họ và tên': string,
        'Ngày sinh': Date,
        'Điểm chuyên cần': number | null;
        'Điểm giữa kì': number | null;
        'Điểm thi': number | null;
        'Điểm môn học': number | null;
        'Thành chữ': string | null;
}


export interface ResultResponse {
  completed: number;
  debt: number;
  gpa: number;
}

export interface RegisteredExcel {
  STT: number;
  'Môn học': string;
  TC: number;
  'Lớp môn học': string;
  'Tổng sinh viên': number;
  'Đã đăng ký': number;
  'Giáo viên': string;
}
