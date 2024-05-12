import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationCourseComponent } from 'src/app/page/registration-course/registration-course.component';

import { LayoutPrivateComponent } from './layout-private.component';
import { ScoreComponent } from 'src/app/page/score/score.component';
import { ClassComponent } from 'src/app/page/class/class.component';
import { LayoutStudentComponent } from './layout-student/layout-student.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      { path: 'register-course', component: RegistrationCourseComponent },
      { path: 'score', component: ScoreComponent },
      { path: 'class', component: ClassComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    LayoutStudentComponent
  ],
  exports: [CommonModule, RouterModule],
})
export class LayoutPrivateModule {}
