import { Subject } from './subject.models';
import { Teacher } from './teacher.models';

export interface ClassSubject {
  id: string;
  size: number;
  startDate: Date;
  subject: Subject;
  teacher: Teacher;
  registered:number;
}
