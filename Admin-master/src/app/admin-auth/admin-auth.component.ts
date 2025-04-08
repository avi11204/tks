import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  passauth!: FormGroup;
  passchange!: FormGroup;
  submitted = false;
  submitted2 = false;
  notequal = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.passauth = this.fb.group({
      pass: ['', Validators.required],
    });

    this.passchange = this.fb.group({
      opass: ['', Validators.required],
      npass: ['', Validators.required],
      cnpass: ['', Validators.required]
    });
  }

  get f(): { [key: string]: any } {
    return this.passauth.controls;
  }

  get c(): { [key: string]: any } {
    return this.passchange.controls;
  }

  ngOnInit(): void {
    if (localStorage.getItem('adminloggedin') === 'true') {
      this.router.navigate(['/quicknav']);
    }
  }

  passbtn = (): void => {
    this.submitted = true;
    if (this.passauth.invalid) {
      return;
    }

    const pb = document.getElementById('pb') as HTMLButtonElement;
    pb.disabled = true;
    pb.innerHTML = 'Logging you in  <i class=\'fa fa-spinner fa-pulse\'></i>';

    firebase.database().ref('/admin/').once('value').then((snapshot) => {
      const p = snapshot.val().password;
      if (this.passauth.controls.pass.value.toString() === p.toString()) {
        localStorage.setItem('adminloggedin', 'true');
        this.router.navigate(['/quicknav']);
      } else {
        this.showTemporaryMessage('nope', pb, 'LOGIN');
      }
    });
  }

  changepassword = (): void => {
    this.submitted2 = true;
    if (this.passchange.invalid) {
      return;
    }

    if (this.passchange.controls.npass.value.toString() !== this.passchange.controls.cnpass.value.toString()) {
      this.notequal = true;
      return;
    }

    const cpb = document.getElementById('cpb') as HTMLButtonElement;
    cpb.disabled = true;
    cpb.innerHTML = 'Updating...<i class=\'fa fa-spinner fa-pulse\'></i>';

    firebase.database().ref('/admin/').once('value').then((snapshot) => {
      const p = snapshot.val().password;
      if (this.passchange.controls.opass.value.toString() === p.toString()) {
        firebase.database().ref('/admin/').update({
          password: this.passchange.controls.cnpass.value
        });
        this.showTemporaryMessage('yes', cpb, 'Change Password');
      } else {
        this.showTemporaryMessage('nope', cpb, 'Change Password');
      }
    });
  }

  change = (): void => {
    this.toggleVisibility('noc', 'chpa', false);
  }

  nochange = (): void => {
    this.toggleVisibility('noc', 'chpa', true);
  }

  private showTemporaryMessage = (elementId: string, button: HTMLButtonElement, buttonText: string): void => {
    const element = document.getElementById(elementId) as HTMLDivElement;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
      button.disabled = false;
      button.innerHTML = buttonText;
    }, 5000);
  }

  private toggleVisibility = (hideId: string, showId: string, reverse: boolean): void => {
    const hideElement = document.getElementById(hideId) as HTMLFormElement;
    const showElement = document.getElementById(showId) as HTMLFormElement;
    hideElement.style.display = reverse ? 'flex' : 'none';
    showElement.style.display = reverse ? 'none' : 'flex';
  }
}
