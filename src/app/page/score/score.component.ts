import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentInfo } from 'src/app/models/student.models';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss', '../../app.component.scss'],
})
export class ScoreComponent implements OnInit {
  student!: StudentInfo;
  constructor(private studentService: StudentService) {}
  roundToTwoDecimalPlaces(number: number): number {
    return Math.round(number * 10) / 10;
  }
  ngOnInit(): void {
    const data = localStorage.getItem('studentInfo');
    if (data) {
      this.student = JSON.parse(data);
    }
  }
}
