import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-student',
  templateUrl: './layout-student.component.html',
  styleUrls: ['./layout-student.component.scss'],
})
export class LayoutStudentComponent {
  token: string | undefined;
  constructor() {
    const data = localStorage.getItem('token');
    if (data) {
      this.token = JSON.parse(data);
    }
  }
}
