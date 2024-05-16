import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TeacherInfo } from '../models/teacher.models';
import { urlApi } from './urlApi';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private apiService: ApiService) {}
  getTeacherInfo(): Observable<HttpResponse<TeacherInfo>> {
    return this.apiService.get(urlApi + '/teacher/info');
  }
}
