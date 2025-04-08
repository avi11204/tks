import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status1 = false;
  status2 = false;
  Username = '';
  Password = '';
  msg1 = '';
  msg2 = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.Username === '') {
      this.status1 = true;
      this.msg1 = "Username Error";
    }
    if(this.Password === '') {
      this.status2 = true;
      this.msg2 = "Password Error";
    }
    if(this.Username==='Gowthaman') {
      if(this.Password==='123') {
        this.router.navigate(['home']);
      }
    }
  }

  onChange1(event) {
    this.status1 = false;
  }

  onChange2(event) {
    this.status2 = false;
  }

}
