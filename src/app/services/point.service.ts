import { Injectable } from '@angular/core';
import { urlApi } from './urlApi';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Point, ResultResponse } from '../models/point.models';
import { PointPayload, PointRequest } from '../models/request.models';
import { InsertPointRequest } from '../models/request.model';
@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(private apiService: ApiService) {}
  getPointsByClassSubjectId(id: string): Observable<HttpResponse<Point[]>> {
    return this.apiService.get(
      urlApi + '/point/getPointsByClassSubjectId/' + id
    );
  }
  editPoint(
    studentId: string,
    classesSubjectsId: string,
    pointRequest: PointRequest
  ): Observable<HttpResponse<Point>> {
    return this.apiService.post(
      urlApi + `/point/editPoint/${studentId}/${classesSubjectsId}`,
      pointRequest
    );
  }
  editListPoint(
    pointPayloads: PointPayload[]
  ): Observable<HttpResponse<Point[]>> {
    return this.apiService.post(urlApi + '/point/editListPoint', pointPayloads);
  }
  getPointsByStudentId(id: string): Observable<HttpResponse<Point[]>> {
    return this.apiService.get(urlApi + '/point/getPointsByStudentId/' + id);
  }
  getResultByStudentId(id: string): Observable<HttpResponse<ResultResponse>> {
    return this.apiService.get(urlApi + '/point/result/' + id);
  }
  insertPoint(insertPointRequest: InsertPointRequest) {
    return this.apiService.post(
      urlApi + '/point/insertPoint',
      insertPointRequest
    );
  }
}
