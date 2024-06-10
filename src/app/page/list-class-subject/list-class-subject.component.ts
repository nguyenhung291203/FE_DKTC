import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClassSubject } from 'src/app/models/classSubject.models';
import { UserStudentResponse } from 'src/app/models/student.models';
import { ClassSubjectService } from 'src/app/services/class-subject.service';

@Component({
  selector: 'app-list-class-subject',
  templateUrl: './list-class-subject.component.html',
  styleUrls: ['./list-class-subject.component.scss'],
})
export class ListClassSubjectComponent implements OnInit {
  student!: UserStudentResponse;
  listClassSubject!: ClassSubject[];
  idClassSubject!: string | null;
  constructor(private classSubjectService: ClassSubjectService) {}
  ngOnInit(): void {
    const data = localStorage.getItem('access');
    if (data) {
      this.classSubjectService
        .getClassSubjectByStudentId(JSON.parse(data).id)
        .subscribe((data: HttpResponse<ClassSubject[]>) => {
          if (data.body) {
            this.listClassSubject = data.body;
          }
        });
    }
  }
  handleOpenClass(idClassSubject: string): void {
    this.idClassSubject =
      this.idClassSubject === idClassSubject ? null : idClassSubject;
  }
}
