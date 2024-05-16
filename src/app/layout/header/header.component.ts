import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  checkToken: boolean;
  token: string|undefined;
  private checkTokenSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.checkToken = this.authService.checkToken.getValue();
    this.checkTokenSubscription = this.authService.checkToken.subscribe(
      (value) => {
        this.checkToken = value;
        const data = localStorage.getItem('token');
        if (data) {
          this.token = JSON.parse(data);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.checkTokenSubscription.unsubscribe();
    this.token = undefined;
  }

  logout(): void {
    this.authService.setCheckToken(false);
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
