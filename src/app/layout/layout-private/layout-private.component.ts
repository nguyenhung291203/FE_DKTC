import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss'],
})
export class LayoutPrivateComponent implements OnInit {
  checkToken: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.checkToken = this.authService.checkToken.getValue();
    if (!this.checkToken) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {}
}
