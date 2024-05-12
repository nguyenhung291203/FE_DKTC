import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from './urlApi';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private apiService:ApiService) {}
  getTest(): Observable<unknown> {
    return this.apiService.get(urlApi + '/test');
  }
}
