import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserTeacherResponse } from '../models/teacher.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  get(url: string): Observable<any> {
    const data = localStorage.getItem('access');
    let token = '';
    if (data) {
      const res = JSON.parse(data);
      token =
        res.jwtAuthResponse.tokenType + ' ' + res.jwtAuthResponse.accessToken;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      }),
      observe: 'response' as 'body',
    };

    return this.httpClient.get(url, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }
  post(url: string, model: any): Observable<any> {
    const data = localStorage.getItem('access');
    let token = '';
    if (data) {
      const res = JSON.parse(data);
      token =
        res.jwtAuthResponse.tokenType + ' ' + res.jwtAuthResponse.accessToken;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      }),
      observe: 'response' as 'body',
    };
    return this.httpClient.post(url, model, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
