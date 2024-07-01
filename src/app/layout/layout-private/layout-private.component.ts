import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss'],
})
export class LayoutPrivateComponent implements OnInit {
  token!: string;
  constructor(private router: Router) {
    const data = localStorage.getItem('access');
    if (data) {
      this.token = data;
    }
    if (!data) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {}
}
