import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Point, ResultResponse,PointExcel } from 'src/app/models/point.models';
import { Student, UserStudentResponse } from 'src/app/models/student.models';
import { ExportService } from 'src/app/services/export.service';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss'],
})
export class ResultDetailComponent implements OnInit {
  student!: UserStudentResponse;
  listPoint!: Point[];
  resultResponse: ResultResponse = {
    completed: 0,
    debt: 0,
    gpa: 0,
  };
  constructor(private pointService: PointService,private exportService:ExportService) {}
  ngOnInit(): void {
    const data = localStorage.getItem('access');
    if (data) {
      this.student = JSON.parse(data);
      this.pointService
        .getPointsByStudentId(this.student.id)
        .subscribe((data: HttpResponse<Point[]>) => {
          if (data.body) {
            this.listPoint = data.body.filter((item) => item.actived);
          }
        });
      this.pointService
        .getResultByStudentId(this.student.id)
        .subscribe((data: HttpResponse<ResultResponse>) => {
          if (data.body) {
            this.resultResponse = data.body;
          }
        });
    }
  }
  mapListPointToListPointExport(listPoint: Point[]): PointExcel[] {
    return listPoint.map((point: Point, index: number) => {
      return {
        STT: index + 1,
        'Mã số SV': point.student.id,
        'Họ và tên': point.student.name,
        'Ngày sinh': point.student.dateOfBirth,
        'Điểm chuyên cần': point.scoreNumberOne,
        'Điểm giữa kì': point.scoreNumberTwo,
        'Điểm thi': point.scoreNumberThree,
        'Điểm môn học': point.scoreTotal,
        'Thành chữ': point.scoreLetter,
      };
    });
  }
  handleExport():void{
    this.exportService.exportCertificateExcel(
      this.mapListPointToListPointExport(this.listPoint),
      this.student.name + new Date()
    );
  }
}
