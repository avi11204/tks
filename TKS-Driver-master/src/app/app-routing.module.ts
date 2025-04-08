import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { TripsheetComponent } from './tripsheet/tripsheet.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'tasks', component:TasksComponent},
  {path: 'home', component:HomeComponent},
  {path: 'attendance', component:AttendanceComponent},
  {path: 'tripsheet', component:TripsheetComponent},
  {path: 'profile', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
