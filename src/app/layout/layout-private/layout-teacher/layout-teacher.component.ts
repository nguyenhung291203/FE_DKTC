import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-teacher',
  templateUrl: './layout-teacher.component.html',
  styleUrls: ['./layout-teacher.component.scss']
})
export class LayoutTeacherComponent {
  token: string | undefined;
  constructor() {
    const data = localStorage.getItem('token');
    if (data) {
      this.token = JSON.parse(data);
    }
  }
}
