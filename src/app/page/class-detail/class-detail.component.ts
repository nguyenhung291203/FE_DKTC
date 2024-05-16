import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassResponse } from 'src/app/models/class.models';
import { StudentClass, StudentInfo } from 'src/app/models/student.models';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  classResponse!: ClassResponse;
  students!: StudentInfo[];
  studentsClass!: StudentClass[];
  student!: StudentClass;
  isOpenModel: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private studentService: StudentService
  ) {}
  roundToTwoDecimalPlaces(number: number | string) {
    if (typeof number === 'number') return Math.round(number * 10) / 10;
    return '';
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.classService
        .getClassById(id)
        .subscribe((data: HttpResponse<ClassResponse>) => {
          if (data.body) {
            this.classResponse = data.body;
          }
        });
      this.studentService
        .getListStudentInfoByClassId(id)
        .subscribe((data: HttpResponse<StudentInfo[]>) => {
          if (data.body) {
            this.students = data.body;
            this.studentsClass = this.students.map((item: StudentInfo) => {
              if (
                item.results.find(
                  (res) => res.codeCourse == this.classResponse.codeCourse
                )
              ) {
                return {
                  id: item.id,
                  dateOfBirth: item.dateOfBirth,
                  majorName: item.majorName,
                  name: item.name,
                  completed: item.completed,
                  debt: item.debt,
                  gpa: item.gpa,
                  scoreLetter: item.results[0].scoreLetter,
                  scoreNumberOne: item.results[0].scoreNumberOne,
                  scoreNumberThree: item.results[0].scoreNumberThree,
                  scoreNumberTwo: item.results[0].scoreNumberTwo,
                  scoreTotal: item.results[0].scoreTotal,
                };
              }
              return {
                id: item.id,
                dateOfBirth: item.dateOfBirth,
                majorName: item.majorName,
                name: item.name,
                completed: item.completed,
                debt: item.debt,
                gpa: item.gpa,
                scoreLetter: '',
                scoreNumberOne: '',
                scoreNumberThree: '',
                scoreNumberTwo: '',
                scoreTotal: '',
              };
            });
          }
        });
    });
  }
  openModel(student: StudentClass): void {
    this.student = student;
    this.isOpenModel = true;
  }
  closeModel(): void {
    this.isOpenModel = false;
  }
  handleSubmit($event: any): void {
    const scoreNumberOne = $event.target.elements.scoreNumberOne.value;
    const scoreNumberThree = $event.target.elements.scoreNumberThree.value;
    const scoreNumberTwo = $event.target.elements.scoreNumberTwo.value;
    if (scoreNumberOne && scoreNumberTwo && scoreNumberThree) {
      
    }
  }
}
