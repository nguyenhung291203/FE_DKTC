import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@mescius/spread-sheets';
import { Point } from 'src/app/models/point.models';
import { Student } from 'src/app/models/student.models';
import { University } from 'src/app/models/university.models';
import { PdfService } from 'src/app/services/pdf.service';
import { PointService } from 'src/app/services/point.service';
import { StudentService } from 'src/app/services/student.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: ['./university-detail.component.scss'],
})
export class UniversityDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  university!: University;
  listStudent!: Student[];
  listPoint!: Point[];
  totalGraduate: number = 0;
  constructor(
    private universityService: UniversityService,
    private studentService: StudentService,
    private pointService: PointService,
    private pdfService: PdfService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      [
        this.universityService
          .getUniversityById(id)
          .subscribe((data: HttpResponse<University>) => {
            if (data.body) {
              this.university = data.body;
              this.studentService
                .searchListStudentByUniversityId(id)
                .subscribe((data: HttpResponse<Student[]>) => {
                  if (data.body) {
                    this.listStudent = data.body.map((student: Student) => {
                      this.pointService
                        .getPointsByStudentId(student.id)
                        .subscribe((data: HttpResponse<Point[]>) => {
                          if (data.body) {
                            student.registered = data.body.length;
                            student.totalGraduate = data.body.filter(
                              (point: Point) =>
                                point.scoreTotal && point.scoreTotal >= 4
                            ).length;
                          }
                        });
                      return student;
                    });

                    this.totalGraduate = this.listStudent.filter((student) => {
                      let s;
                      this.pointService
                        .getPointsByStudentId(student.id)
                        .subscribe((data: HttpResponse<Point[]>) => {
                          if (data.body) {
                            if (
                              data.body.every(
                                (item) =>
                                  item.scoreTotal && item.scoreTotal >= 4
                              ) &&
                              data.body.length >= 4
                            ) {
                              s = student;
                            }
                          }
                        });
                      if (s) return s;
                    }).length;
                  }
                });
            }
          }),
      ];
  }
  roundToTwoDecimals(num: number): number {
    return Math.round(num * 100) / 100;
  }
  exportAsPDF(id: string) {
    this.pointService
      .getPointsByStudentId(id)
      .subscribe((data: HttpResponse<Point[]>) => {
        if (data.body) {
          console.log(data.body);
          const grade10 = this.grade10(data.body);
          console.log('grade10:', grade10);
          this.pdfService.exportAsPDF(
            data.body,
            `${id} - ${data.body[0].student.name} - ${data.body[0].student.classStudent.marjor.name} - ${data.body[0].student.classStudent.marjor.university.name}`
          );
        }
      });
  }
  exportAllAsPDF(): void {
    this.listStudent.filter((student:Student)=>student.totalGraduate&&student.totalGraduate>=4).forEach((student: Student) => {
      this.exportAsPDF(student.id);
    });
  }
  grade10(listPoint: Point[]): number {
    return (
      listPoint.reduce((accumulator, currentValue) => {
        if (currentValue.scoreTotal)
          return (
            accumulator +
            currentValue.scoreTotal * currentValue.classSubject.subject.credit
          );
        return accumulator;
      }, 0) /
      listPoint.reduce((accumulator, currentValue) => {
        if (currentValue.classSubject.subject.credit)
          return accumulator + currentValue.classSubject.subject.credit;
        return accumulator;
      }, 0)
    );
  }
}
