import { Component, OnInit } from '@angular/core';
import { TeacherInfo } from 'src/app/models/teacher.models';

@Component({
  selector: 'app-manager-score',
  templateUrl: './manager-score.component.html',
  styleUrls: ['./manager-score.component.scss'],
})
export class ManagerScoreComponent implements OnInit {
  teacher!: TeacherInfo;
  id!: number;
  constructor() {}
  ngOnInit(): void {
    const data = localStorage.getItem('teacherInfo');
    if (data) {
      this.teacher = JSON.parse(data);
    }
  }
  changeIsOpen(id: number): void {
    this.teacher.classes.map((item) => {
      if (item.id === id) return (item.isOpen = !item.isOpen);
      return item;
    });
  }
}
