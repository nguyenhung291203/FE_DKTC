import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/request.models';
import { UserTeacherResponse } from 'src/app/models/teacher.models';
import { UserStudentResponse } from 'src/app/models/student.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: 'user13',
    password: 'ramesh',
  };
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginRequest).subscribe(
      (data: HttpResponse<UserTeacherResponse | UserStudentResponse>) => {
        if (data.body) {
          localStorage.setItem('access', JSON.stringify(data.body));
          this.authService.setAccess();
          this.router.navigateByUrl('');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('Thông tin tài khoản mật khẩu không chính xác');
      }
    );
  }
}
