import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { JwtAuthResponse } from 'src/app/models/jwtAuthResponse.models';
import { StudentService } from 'src/app/services/student.service';
import { StudentInfo } from 'src/app/models/student.models';
import { ClassService } from 'src/app/services/class.service';
import { ClassResponse } from 'src/app/models/class.models';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeacherInfo } from 'src/app/models/teacher.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: 'user1',
    password: 'admin',
  };
  student!: StudentInfo;
  teacher!: TeacherInfo;
  classes!: ClassResponse[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  login() {
    this.authService.login(this.loginRequest).subscribe(
      (response: HttpResponse<JwtAuthResponse>) => {
        if (response.body?.accessToken) {
          localStorage.setItem(
            'accessToken',
            response.body.tokenType + ' ' + response.body.accessToken
          );
          localStorage.setItem('token', JSON.stringify(response.body.role));
          this.authService.setCheckToken(true);
          this.router.navigateByUrl('');
        }
        const data = localStorage.getItem('token');
        if (data) {
          if (JSON.parse(data) == 'ROLE_STUDENT') {
            this.studentService
              .getStudentInfo()
              .subscribe((data: HttpResponse<StudentInfo>) => {
                if (data.body) {
                  this.student = data.body;
                  localStorage.setItem(
                    'studentInfo',
                    JSON.stringify(this.student)
                  );
                }
              });
          } else {
            this.teacherService
              .getTeacherInfo()
              .subscribe((data: HttpResponse<TeacherInfo>) => {
                console.log(data);
                if (data.body) {
                  this.teacher = data.body;
                  localStorage.setItem(
                    'teacherInfo',
                    JSON.stringify(this.teacher)
                  );
                }
              });
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('Thông tin tài khoản mật khẩu không chính xác');
      }
    );
  }
}
