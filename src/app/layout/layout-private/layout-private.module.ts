import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPrivateComponent } from './layout-private.component';
import { LayoutStudentComponent } from './layout-student/layout-student.component';
import { LayoutTeacherComponent } from './layout-teacher/layout-teacher.component';
import { ManagerScoreComponent } from 'src/app/page/manager-score/manager-score.component';
import { ClassSubjectDetailComponent } from 'src/app/page/class-subject-detail/class-subject-detail.component';
import { ResultDetailComponent } from 'src/app/page/result-detail/result-detail.component';
import { ListClassSubjectComponent } from 'src/app/page/list-class-subject/list-class-subject.component';
import { RegisterSubjectComponent } from 'src/app/page/register-subject/register-subject.component';
import { ListUniversityComponent } from 'src/app/page/list-university/list-university.component';
import { UniversityDetailComponent } from 'src/app/page/university-detail/university-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: '',
        component: LayoutStudentComponent,
        children: [
          {
            path: 'result-detail',
            component: ResultDetailComponent,
          },
          {
            path: 'list-class-subject',
            component: ListClassSubjectComponent,
          },
          {
            path: 'register-result',
            component: RegisterSubjectComponent,
          },
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
            path: 'list-university',
            component:ListUniversityComponent
          },
        ],
      },
      {
        path: 'manager-score/:id',
        component: ClassSubjectDetailComponent,
      },
      {
        path:"list-university/:id",
        component:UniversityDetailComponent
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [CommonModule, RouterModule],
})
export class LayoutPrivateModule {}
