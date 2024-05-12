import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from './urlApi';
import { LoginRequest } from '../models/login.models';
import { ApiService } from './api.service';
import { JwtAuthResponse } from '../models/jwtAuthResponse.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private http:HttpClient) {}

  checkToken = new BehaviorSubject<boolean>(
    localStorage.getItem('accessToken') !== null
  );

  setCheckToken(value: boolean): void {
    this.checkToken.next(value);
  }
  login(loginRequest: LoginRequest): Observable<HttpResponse<JwtAuthResponse>> {
    return this.apiService.post(urlApi + '/auth/login', loginRequest);
  }
  
}
