import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [AttendanceService]
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
