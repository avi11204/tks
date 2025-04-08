import { Component, Input, OnInit } from '@angular/core';
import { AttendanceData } from '../attendance.model';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  attendance: AttendanceData[];

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit() {
    this.attendance = this.attendanceService.getAttendance();
  }

}
