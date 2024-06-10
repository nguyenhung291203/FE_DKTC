import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UserTeacherResponse } from 'src/app/models/teacher.models';
import { UserStudentResponse } from 'src/app/models/student.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  access: UserTeacherResponse | UserStudentResponse | undefined;
  subscription = Subscription.EMPTY;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.subscription = this.authService.access$.subscribe((data) => {
      this.access = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logout(): void {
    localStorage.clear();
    this.authService.setAccess();
    this.router.navigateByUrl('login');
  }
}
