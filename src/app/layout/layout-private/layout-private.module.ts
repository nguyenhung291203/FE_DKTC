import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationCourseComponent } from 'src/app/page/registration-course/registration-course.component';

import { LayoutPrivateComponent } from './layout-private.component';
import { ScoreComponent } from 'src/app/page/score/score.component';
import { ClassComponent } from 'src/app/page/class/class.component';
import { LayoutStudentComponent } from './layout-student/layout-student.component';
import { LayoutTeacherComponent } from './layout-teacher/layout-teacher.component';
import { ManagerScoreComponent } from 'src/app/page/manager-score/manager-score.component';
import { ClassDetailComponent } from 'src/app/page/class-detail/class-detail.component';

const token = localStorage.getItem('token');
const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: '',
        component: LayoutStudentComponent,
        children: [
          { path: 'register-course', component: RegistrationCourseComponent },
          { path: 'score', component: ScoreComponent },
          { path: 'class', component: ClassComponent },
        ],
      },
      {
        path: '',
        component: LayoutTeacherComponent,
        children: [
          {
            path: 'manager-score',
            component: ManagerScoreComponent,
          },
          {
            path: 'manager-score/:id',
            component: ClassDetailComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [CommonModule, RouterModule],
})
export class LayoutPrivateModule {}
