import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassSubject } from 'src/app/models/classSubject.models';
import { UserTeacherResponse } from 'src/app/models/teacher.models';
import { ClassSubjectService } from 'src/app/services/class-subject.service';

@Component({
  selector: 'app-manager-score',
  templateUrl: './manager-score.component.html',
  styleUrls: ['./manager-score.component.scss'],
})
export class ManagerScoreComponent implements OnInit {
  teacher!: UserTeacherResponse;
  listClassSubject!: ClassSubject[];
  idClassSubject!: string | null;
  constructor(
    private classSubjectService: ClassSubjectService,
  ) {}
  ngOnInit(): void {
    const data = localStorage.getItem('access');
    if (data) {
      this.teacher = JSON.parse(data);
      this.classSubjectService
        .searchListClassSubjectsByTeacherId(this.teacher.id)
        .subscribe((data) => {
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
  handleTranfer(idClassSubject: string): void {}
}
