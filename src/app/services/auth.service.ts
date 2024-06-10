import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from './urlApi';
import { ApiService } from './api.service';

import { UserTeacherResponse } from '../models/teacher.models';
import { LoginRequest } from '../models/request.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {
    this.setAccess();
  }

  private accessSubject = new BehaviorSubject<UserTeacherResponse | undefined>(
    undefined
  );
  access$ = this.accessSubject.asObservable();

  setAccess(): void {
    const data = localStorage.getItem('access');
    const access = data ? JSON.parse(data) : undefined;
    this.accessSubject.next(access);
  }

  getAccess(): UserTeacherResponse | undefined {
    return this.accessSubject.getValue();
  }
  login(
    loginRequest: LoginRequest
  ): Observable<HttpResponse<UserTeacherResponse>> {
    return this.apiService.post(urlApi + '/auth/login', loginRequest);
  }
}
