import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { SupportComponent } from './page/support/support.component';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';
import { LayoutPrivateComponent } from './layout/layout-private/layout-private.component';

import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutStudentComponent } from './layout/layout-private/layout-student/layout-student.component';
import { LayoutTeacherComponent } from './layout/layout-private/layout-teacher/layout-teacher.component';
import { ManagerScoreComponent } from './page/manager-score/manager-score.component';
import { ClassSubjectDetailComponent } from './page/class-subject-detail/class-subject-detail.component';
import { FileSaverModule } from 'ngx-filesaver';
import { SpreadSheetsModule } from '@mescius/spread-sheets-angular';
import { ResultDetailComponent } from './page/result-detail/result-detail.component';
import { ListClassSubjectComponent } from './page/list-class-subject/list-class-subject.component';
import { RegisterSubjectComponent } from './page/register-subject/register-subject.component';

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    SupportComponent,
    LayoutDefaultComponent,
    LayoutPrivateComponent,
    HeaderComponent,
    LoginComponent,
    LayoutStudentComponent,
    LayoutTeacherComponent,
    ManagerScoreComponent,
    ClassSubjectDetailComponent,
    ResultDetailComponent,
    ListClassSubjectComponent,
    RegisterSubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileSaverModule,
    SpreadSheetsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
