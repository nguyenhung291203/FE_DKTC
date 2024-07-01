import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { University } from 'src/app/models/university.models';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.scss'],
})
export class ListUniversityComponent implements OnInit {
  listUniversity!: University[];
  constructor(private universityService: UniversityService) {}
  idUniversity!: string;
  ngOnInit(): void {
    this.universityService
      .getAllUniversities()
      .subscribe((data: HttpResponse<University[]>) => {
        if (data.body) {
          this.listUniversity = data.body;
        }
      });
  }
  changeIdUniversity(id: string) {
    this.idUniversity = id;
  }
}
