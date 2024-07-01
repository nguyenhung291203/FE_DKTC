import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { University } from '../models/university.models';
import { urlApi } from './urlApi';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  constructor(private apiService: ApiService) {}
  getAllUniversities(): Observable<HttpResponse<University[]>> {
    return this.apiService.get(urlApi + '/university/getAllUniversities');
  }
  getUniversityById(id: string): Observable<HttpResponse<University>> {
    return this.apiService.get(urlApi + '/university/getUniversityById/' + id);
  }
}
