import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-attendance-mark',
  templateUrl: './attendance-mark.component.html',
  styleUrls: ['./attendance-mark.component.css']
})
export class AttendanceMarkComponent implements OnInit {

  myDate:Date;
  today= new Date();
  jsdate = '';
  jstime = '';
  constructor() { }

  ngOnInit(): void {
  }

  checkIn() {
    // this.myDate = new Date();
    this.jsdate = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
    this.jstime = formatDate(this.today, 'hh:mm:ss', 'en-US', '+0530');
    console.log(this.jsdate);
    console.log(this.jstime);
    
  }

}
