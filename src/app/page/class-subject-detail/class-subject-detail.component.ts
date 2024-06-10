import { HttpResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassSubject } from 'src/app/models/classSubject.models';
import { Point, PointExcel } from 'src/app/models/point.models';
import { PointPayload } from 'src/app/models/request.models';
import { Student } from 'src/app/models/student.models';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { ExportService } from 'src/app/services/export.service';
import { ImportService } from 'src/app/services/import.service';
import { PointService } from 'src/app/services/point.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-class-subject-detail',
  templateUrl: './class-subject-detail.component.html',
  styleUrls: ['./class-subject-detail.component.scss'],
})
export class ClassSubjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  classSubject!: ClassSubject;
  listPoint!: Point[];
  point!: Point | null;
  file!: File;
  @ViewChild('scoreNumberOneInput') scoreNumberOneInput!: ElementRef;
  @ViewChild('scoreNumberTwoInput') scoreNumberTwoInput!: ElementRef;
  @ViewChild('scoreNumberThreeInput') scoreNumberThreeInput!: ElementRef;
  constructor(
    private classSubjectService: ClassSubjectService,
    private pointService: PointService,
    private exportService: ExportService,
    private importService: ImportService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.classSubjectService
        .getClassSubjectById(id)
        .subscribe((data: HttpResponse<ClassSubject>) => {
          if (data.body) {
            this.classSubject = data.body;
          }
        });
      this.pointService
        .getPointsByClassSubjectId(id)
        .subscribe((data: HttpResponse<Point[]>) => {
          if (data.body) {
            this.listPoint = data.body.map((point: Point) => {
              if (!point.actived)
                return {
                  ...point,
                  scoreNumberOne: null,
                  scoreNumberTwo: null,
                  scoreNumberThree: null,
                  scoreTotal: null,
                  scoreLaster: null,
                  scoreLetter: null,
                };
              return point;
            });
          }
        });
    }
  }
  handleSelectPoint(point: Point): void {
    this.point = point;
  }
  handleCloseModel(): void {
    this.point = null;
  }
  handleSubmit(): void {
    const scoreNumberOne = Number.parseFloat(
      this.scoreNumberOneInput.nativeElement.value
    );
    const scoreNumberTwo = Number.parseFloat(
      this.scoreNumberTwoInput.nativeElement.value
    );
    const scoreNumberThree = Number.parseFloat(
      this.scoreNumberThreeInput.nativeElement.value
    );
    if (
      scoreNumberOne !== null &&
      scoreNumberTwo !== null &&
      scoreNumberThree !== null
    ) {
      if (this.point) {
        this.pointService
          .editPoint(this.point.student.id, this.classSubject.id, {
            scoreNumberOne: scoreNumberOne,
            scoreNumberTwo: scoreNumberTwo,
            scoreNumberThree: scoreNumberThree,
          })
          .subscribe((data: HttpResponse<Point>) => {
            if (data.body) {
              this.listPoint = this.listPoint.map((point: Point) => {
                if (point.student.id === data.body?.student.id)
                  return data.body;
                return point;
              });
            }
          });
      }
      this.handleCloseModel();
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
  mapListPointExcelToListPointPayload(
    listPointExcel: PointExcel[]
  ): PointPayload[] {
    return listPointExcel.map((pointExcel: PointExcel) => {
      return {
        id: {
          studentId: pointExcel['Mã số SV'],
          classesSubjectsId: this.classSubject.id,
        },
        scoreNumberOne: pointExcel['Điểm chuyên cần'],
        scoreNumberTwo: pointExcel['Điểm giữa kì'],
        scoreNumberThree: pointExcel['Điểm thi'],
      };
    });
  }
  exportExcel(): void {
    this.exportService.exportExcel(
      this.mapListPointToListPointExport(this.listPoint),
      'points'
    );
  }
  importExcel(): void {
    if (this.file) {
      this.importService
        .importExcel(this.file)
        .subscribe((data: PointExcel[]) => {
          const res = this.mapListPointExcelToListPointPayload(data);
          this.pointService
            .editListPoint(res)
            .subscribe((data: HttpResponse<Point[]>) => {
              if (data.body) {
                this.listPoint = data.body;
              }
            });
        });
    }
  }
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }
}
