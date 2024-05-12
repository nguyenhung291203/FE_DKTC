import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RegisterCourse } from '../models/registerCourse.models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { urlApi } from './urlApi';

@Injectable({
  providedIn: 'root',
})
export class RegisterCourseService {
  constructor(private apiService: ApiService) {}
  registerCourse(payload:RegisterCourse):Observable<HttpResponse<unknown>>{
    return this.apiService.post(urlApi+"/register-course",payload);
  }
}
