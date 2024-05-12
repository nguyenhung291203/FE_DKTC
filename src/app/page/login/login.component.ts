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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: 'admin',
    password: 'admin',
  };
  student!: StudentInfo;
  classes!: ClassResponse[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  login() {
    this.authService.login(this.loginRequest).subscribe(
      (response: HttpResponse<JwtAuthResponse>) => {
        if (response.body?.accessToken) {
          localStorage.setItem(
            'accessToken',
            response.body.tokenType + ' ' + response.body.accessToken
          );
          this.authService.setCheckToken(true);
          this.router.navigateByUrl('');
        }
        this.studentService
          .getStudentInfo()
          .subscribe((data: HttpResponse<StudentInfo>) => {
            if (data.body) {
              this.student = data.body;
              localStorage.setItem('studentInfo', JSON.stringify(this.student));
              
            }
          });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('Thông tin tài khoản mật khẩu không chính xác');
      }
    );
  }
}
