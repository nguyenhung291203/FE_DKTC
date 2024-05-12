import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { urlApi } from './urlApi';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Course } from '../models/course.models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private apiService: ApiService) {}
  getListCourse(): Observable<HttpResponse<Course[]>> {
    return this.apiService.get(urlApi + '/course');
  }
}
