import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/page/home/home.component';
import { SupportComponent } from 'src/app/page/support/support.component';
import { LoginComponent } from 'src/app/page/login/login.component';
import { LayoutDefaultComponent } from './layout-default.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule],
})
export class LayoutDefaultModule {}
