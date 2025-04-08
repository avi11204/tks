import { Injectable } from '@angular/core';
import { AttendanceData } from './attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor() { }

  private attendance: AttendanceData[] = [
    new AttendanceData('01/02/2021','Present','09:35','20:12','10:37'),
    new AttendanceData('02/02/2021','Present','09:36','19:59','10:23'),
    new AttendanceData('03/02/2021','Present','09:30','22:51','13:21'),
    new AttendanceData('04/02/2021','Present','09:41','19:40','9:59'),
    new AttendanceData('05/02/2021','Present','09:59','23:29','13:30'),
    new AttendanceData('06/02/2021','Absent','NA','NA','NA')
  ];

  getAttendance() {
    return this.attendance.slice();
  }

}
