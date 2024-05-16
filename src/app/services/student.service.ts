import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from './urlApi';
import { ApiService } from './api.service';
import { StudentInfo } from '../models/student.models';
import { ClassResponse } from '../models/class.models';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // student!: StudentInfo;
  // studentClass!: ClassResponse[];

  constructor(
    private apiService: ApiService,
    private classService: ClassService
  ) {
    // this.getStudentInfo().subscribe((data: HttpResponse<StudentInfo>) => {
    //   if (data.body) {
    //     this.student = data.body;
    //     this.classService
    //       .getClassByStudentId(this.student.id)
    //       .subscribe((data: HttpResponse<ClassResponse[]>) => {
    //         if (data.body) {
    //           this.studentClass = data.body;
    //         }
    //       });
    //   }
    // });
  }
  getStudentInfo(): Observable<HttpResponse<StudentInfo>> {
    return this.apiService.get(urlApi + '/student/info');
  }

  getListStudentInfoByClassId(
    id: number
  ): Observable<HttpResponse<StudentInfo[]>> {
    return this.apiService.get(
      urlApi + '/student/list-student-info?class_id=' + id
    );
  }
}
