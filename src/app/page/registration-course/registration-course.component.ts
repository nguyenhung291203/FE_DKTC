import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClassResponse } from 'src/app/models/class.models';
import { Course } from 'src/app/models/course.models';
import { StudentInfo } from 'src/app/models/student.models';
import { ClassService } from 'src/app/services/class.service';
import { CourseService } from 'src/app/services/course.service';
import { RegisterCourseService } from 'src/app/services/register-course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-registration-course',
  templateUrl: './registration-course.component.html',
  styleUrls: [
    './registration-course.component.scss',
    '../../app.component.scss',
  ],
})
export class RegistrationCourseComponent implements OnInit {
  courses!: Course[];
  student!: StudentInfo;
  studentClasses!: ClassResponse[];
  classes!: ClassResponse[];
  selectCodeCourse: string = '';
  register!: number | null;
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private classService: ClassService,
    private registerCourseService: RegisterCourseService
  ) {}
  totalCredit(): number {
    let total = 0;
    this.studentClasses.forEach((item) => {
      total += item.credit;
    });
    return total;
  }
  ngOnInit(): void {
    this.courseService
      .getListCourse()
      .subscribe((data: HttpResponse<Course[]>) => {
        if (data.body) {
          this.courses = data.body;
        }
      });

    this.studentService
      .getStudentInfo()
      .subscribe((data: HttpResponse<StudentInfo>) => {
        if (data.body) {
          this.student = data.body;
          this.classService
            .getClassByStudentId(this.student.id)
            .subscribe((data: HttpResponse<ClassResponse[]>) => {
              if (data.body) {
                this.studentClasses = data.body;
              }
            });
        }
      });
    this.classService
      .getClassByCodeCourse('')
      .subscribe((data: HttpResponse<ClassResponse[]>) => {
        if (data.body) {
          this.classes = data.body;
        }
      });
  }
  handleChangeCodeCourse() {
    this.classService
      .getClassByCodeCourse(this.selectCodeCourse)
      .subscribe((data: HttpResponse<ClassResponse[]>) => {
        if (data.body) {
          this.classes = data.body;
        }
      });
  }
  handleCheckBox(id: number) {
    this.register = id;
  }
  handleRegister() {
    if (this.register) {
      const classRegister = this.classes.find(
        (item) => item.id === this.register
      );
      if (
        this.studentClasses.find(
          (item) => classRegister?.codeCourse === item.codeCourse
        )
      ) {
        alert(
          'Bạn đã đăng ký môn học có mã học phần: ' +
            classRegister?.codeCourse +
            ' trước đó'
        );
      } else {
        if (classRegister?.id) {
          const payload = {
            studentId: this.student.id,
            classId: this.register,
          };
          this.registerCourseService
            .registerCourse(payload)
            .subscribe((data: HttpResponse<unknown>) => {
              this.studentClasses.push(classRegister);
            });
        }
      }
      this.register = null;
    }
  }
}
