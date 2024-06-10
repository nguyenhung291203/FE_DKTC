import { Injectable } from '@angular/core';
import { urlApi } from './urlApi';
import { ApiService } from './api.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassSubject } from '../models/classSubject.models';
@Injectable({
  providedIn: 'root',
})
export class ClassSubjectService {
  constructor(private apiService: ApiService) {}
  getAllClassSubjects(): Observable<HttpResponse<ClassSubject[]>> {
    return this.apiService.get(urlApi + '/class-subject/getAllClassSubjects');
  }
  searchListClassSubjectsByTeacherId(
    teacherId: string
  ): Observable<HttpResponse<ClassSubject[]>> {
    return this.apiService.get(
      urlApi + '/class-subject/searchListClassSubjectsByTeacherId/' + teacherId
    );
  }
  getClassSubjectById(id: string): Observable<HttpResponse<ClassSubject>> {
    return this.apiService.get(urlApi + '/class-subject/' + id);
  }
  getClassSubjectByStudentId(
    id: string
  ): Observable<HttpResponse<ClassSubject[]>> {
    return this.apiService.get(
      urlApi + '/class-subject/getListClassSubjectByStudentId/' + id
    );
  }
  getClassSubjectBySubjectId(subjectId:string=''):Observable<HttpResponse<ClassSubject[]>> {
    return this.apiService.get(
      urlApi + '/class-subject/getClassSubjectBySubjectId?subjectId=' + subjectId
    );
  }
}
