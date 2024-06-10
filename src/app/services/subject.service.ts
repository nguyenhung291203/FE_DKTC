import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.models';
import { HttpResponse } from '@angular/common/http';
import { urlApi } from './urlApi';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private apiService: ApiService) {}
  getAllSubjects():Observable<HttpResponse<Subject[]>>{
    return this.apiService.get(urlApi+"/subject/getAllSubjects");
  }
}
