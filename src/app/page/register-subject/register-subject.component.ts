import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClassSubject } from 'src/app/models/classSubject.models';
import { Subject } from 'src/app/models/subject.models';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserStudentResponse } from 'src/app/models/student.models';
import { PointService } from 'src/app/services/point.service';
import { Point, RegisteredExcel } from 'src/app/models/point.models';
import { mapListPointToListPointExport } from 'src/app/units/mapper';
import { ExportService } from 'src/app/services/export.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-register-subject',
  templateUrl: './register-subject.component.html',
  styleUrls: ['./register-subject.component.scss'],
})
export class RegisterSubjectComponent implements OnInit {
  @ViewChild('content', { static: true }) contentRef!: ElementRef;

  student!: UserStudentResponse;
  listClassSubject: ClassSubject[] = [];
  listClassSubjectOfStudent: ClassSubject[] = [];
  listSubject: Subject[] = [];
  subjectId: string = '';
  classSubjectId: string = '';
  constructor(
    private classSubjectService: ClassSubjectService,
    private subjectService: SubjectService,
    private pointService: PointService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    const data = localStorage.getItem('access');
    if (data) {
      this.student = JSON.parse(data);
      this.classSubjectService
        .getClassSubjectByStudentId(this.student.id)
        .subscribe((data: HttpResponse<ClassSubject[]>) => {
          if (data.body) {
            this.listClassSubjectOfStudent = data.body;
          }
        });
    }

    this.subjectService
      .getAllSubjects()
      .subscribe((data: HttpResponse<Subject[]>) => {
        if (data.body) {
          this.listSubject = data.body;
        }
      });
    this.classSubjectService
      .getAllClassSubjects()
      .subscribe((data: HttpResponse<ClassSubject[]>) => {
        if (data.body) {
          this.listClassSubject = data.body;
        }
      });
  }
  handleChange(event: any) {
    this.subjectId = event.target.value;
    this.classSubjectService
      .getClassSubjectBySubjectId(this.subjectId)
      .subscribe((data: HttpResponse<ClassSubject[]>) => {
        if (data.body) {
          this.listClassSubject = data.body;
        }
      });
  }
  handleSelectClassSubjectId(classSubjectId: string): void {
    this.classSubjectId =
      this.classSubjectId === classSubjectId ? '' : classSubjectId;
  }
  registerTrue(): boolean {
    if (this.listClassSubjectOfStudent.some((item) => item.subject.required))
      return true;
    if (
      this.listClassSubjectOfStudent.length === 3 &&
      this.listClassSubject
        .filter((item) => item.subject.required)
        .map((item) => item.id)
        .indexOf(this.classSubjectId) !== -1
    ) {
      return true;
    }

    if (this.listClassSubjectOfStudent.length < 3) return true;

    return false;
  }
  handleRegister(): void {
    if (
      this.classSubjectId &&
      this.student.id &&
      this.listClassSubjectOfStudent.length < 4
    ) {
      const classSubjectDetail = this.listClassSubject.filter(
        (item) => item.id === this.classSubjectId
      )[0];
      if (
        classSubjectDetail.registered < classSubjectDetail.size &&
        this.listClassSubjectOfStudent.every(
          (item) => item.subject.id !== classSubjectDetail.subject.id
        ) &&
        this.registerTrue()
      ) {
        this.pointService
          .insertPoint({
            classesSubjectsId: this.classSubjectId,
            studentId: this.student.id,
          })
          .subscribe((data: HttpResponse<Point>) => {
            if (data.body) {
              this.listClassSubjectOfStudent = [
                ...this.listClassSubjectOfStudent,
                data.body.classSubject,
              ];
              this.listClassSubject.forEach((item) => {
                if (item.id === this.classSubjectId)
                  item.registered = item.registered + 1;
              });
            }
            this.classSubjectId = '';
          });
      }
    }
  }
  mapListClassSubjectToListRegisterExcel(
    listClassSubject: ClassSubject[]
  ): RegisteredExcel[] {
    return listClassSubject.map((classSubject, index) => {
      return {
        STT: index + 1,
        'Giáo viên': classSubject.teacher.name,
        'Lớp môn học': classSubject.id,
        'Môn học': classSubject.subject.name,
        'Tổng sinh viên': classSubject.size,
        'Đã đăng ký': classSubject.registered,
        TC: classSubject.subject.credit,
      };
    });
  }
  handleExport(): void {
    const elementHtml = document.getElementById('content');
    if (elementHtml)
      html2canvas(elementHtml, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.setProperties({
          title: 'My pdf',
          subject: 'pdf from angular',
          author: 'KMA',
        });
        pdf.setFontSize(12);
        pdf.text('hoho', 14, 22);
        pdf.setTextColor('#000');
        pdf.save('myfile.pdf');
      });
  }
}
