import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TasksComponent } from './tasks/tasks.component';
import { TripsheetComponent } from './tripsheet/tripsheet.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { AttendanceMarkComponent } from './attendance/attendance-mark/attendance-mark.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AttendanceComponent,
    TasksComponent,
    TripsheetComponent,
    ProfileComponent,
    NavbarComponent,
    BodyComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
    AttendanceMarkComponent,
    AttendanceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
