import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { urlApi } from './urlApi';
import { Observable } from 'rxjs';
import { Student } from '../models/student.models';
import { HttpResponse } from '@angular/common/http';
import { University } from '../models/university.models';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private apiService: ApiService) {}
  getListStudentsByClassSubjectId(
    id: string
  ): Observable<HttpResponse<Student[]>> {
    return this.apiService.get(
      urlApi + '/student/listStudentByClassSubjectId/' + id
    );
  }
  searchListStudentByUniversityId(id:string):Observable<HttpResponse<Student[]>>{
    return this.apiService.get(urlApi + '/student/searchListStudentByUniversityId/' + id)
  }
}
