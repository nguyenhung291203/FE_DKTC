import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClassResponse } from 'src/app/models/class.models';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  id!: number;
  classes!: ClassResponse[];

  constructor(private classService: ClassService) {
    const data = localStorage.getItem('studentInfo');
    if (data) {
      this.id = JSON.parse(data).id;
    }
    this.classService
      .getClassByStudentId(this.id)
      .subscribe((data: HttpResponse<ClassResponse[]>) => {
        if (data.body) {
          this.classes = data.body;
        }
      });
  }
  ngOnInit(): void {}
  changeIsOpen(id: number): void {
    this.classes.map((item) => {
      if (item.id === id) return (item.isOpen = !item.isOpen);
      return item;
    });
  }
}
