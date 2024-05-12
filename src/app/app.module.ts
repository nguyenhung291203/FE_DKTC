import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { SupportComponent } from './page/support/support.component';
import { RegistrationCourseComponent } from './page/registration-course/registration-course.component';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';
import { LayoutPrivateComponent } from './layout/layout-private/layout-private.component';

import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './page/score/score.component';
import { ClassComponent } from './page/class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SupportComponent,
    RegistrationCourseComponent,
    LayoutDefaultComponent,
    LayoutPrivateComponent,
    HeaderComponent,
    LoginComponent,
    ScoreComponent,
    ClassComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
