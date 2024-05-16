import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassResponse } from '../models/class.models';
import { urlApi } from './urlApi';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private apiService: ApiService) {}
  getClassByStudentId(id: number): Observable<HttpResponse<ClassResponse[]>> {
    return this.apiService.get(
      urlApi + '/class/search-by-student?student_id=' + id
    );
  }
  getAllClass(): Observable<HttpResponse<ClassResponse[]>> {
    return this.apiService.get(urlApi + '/class');
  }

  getClassByCodeCourse(
    codeCourse: string
  ): Observable<HttpResponse<ClassResponse[]>> {
    return this.apiService.get(
      urlApi + '/class/search-by-code-course?code_course=' + codeCourse
    );
  }

  getClassById(id: number): Observable<HttpResponse<ClassResponse>> {
    return this.apiService.get(urlApi + '/class/' + id);
  }
}
