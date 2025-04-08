// // import { Component, OnInit } from '@angular/core';
// // import {AuthService} from '../services/auth.service';
// // import {ChildActivationStart, Router} from '@angular/router';
// // import {driverdata} from '../interfaces/driverdata';
// // import * as firebase from 'firebase';

// // @Component({
// //   selector: 'app-driver',
// //   templateUrl: './driver.component.html',
// //   styleUrls: ['./driver.component.css']
// // })
// // export class DriverComponent implements OnInit {

// //   mp = true;
// //   drivers: driverdata[] = [];
// //   drvr: driverdata[] = [];
// //   ns = '';
// //   load = false;
// //   constructor(private _router: Router, private auth: AuthService) { }

// //   ngOnInit(): void {

// //   }

// //   driver(name: string){
// //     this.load = true;
// //     this.mp = false;
// //     this.drvr = [];
// //     firebase.database().ref('/DriverData/' + name).once('value').then((snapshot) => {
// //         this.drvr.push({name: snapshot.val().Name, dob: snapshot.val().DOB, tasks: snapshot.val().Tasks, beta: snapshot.val().Beta, monthly: snapshot.val().Monthly, vehicle: snapshot.val().Vehicle, salary: snapshot.val().Salary, attendance: snapshot.val().Attendance, experience: snapshot.val().Experience});
// //     }).then(() => {
// //       this.ns = name;
// //       this.load = false;
// //     });
// //   }

// //   vis(inp: string){
// //     (document.getElementById(inp) as HTMLInputElement).style.display = 'flex';
// //     if (inp == 'sal') {
// //       (document.getElementById('Salary') as HTMLInputElement).focus;
// //     }
// //     else {
// //       (document.getElementById('Beta') as HTMLInputElement).focus;
// //     }
// //   }

// //   hide(inp: string){
// //     (document.getElementById(inp) as HTMLInputElement).style.display = 'none';
// //   }

// //   back(){
// //     this.mp = true;
// //   }

// //   update(e: KeyboardEvent, name: string, pa: any, id: string){
// //     if (e.keyCode == 13){
// //       let am: any = (document.getElementById(id) as HTMLInputElement).value;
// //       am = parseInt(am);
// //       am = am + pa;
// //       if (id === 'Salary'){
// //         firebase.database().ref('DriverData/' + name).update({
// //           Salary: am
// //         }).then(() => {this.driver(name); });
// //       }
// //       else{
// //         firebase.database().ref('DriverData/' + name).update({
// //           Beta: am
// //         }).then(() => {this.driver(name); });
// //       }
// //     }
// //   }

// //   logout(){
// //     this.auth.logout();
// //     this._router.navigate(['']);
// //   }

// // }

// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { driverdata } from '../interfaces/driverdata';
// import * as firebase from 'firebase';

// @Component({
//   selector: 'app-driver',
//   templateUrl: './driver.component.html',
//   styleUrls: ['./driver.component.css']
// })
// export class DriverComponent implements OnInit {

//   mp = true;
//   drivers: driverdata[] = [];
//   drvr: driverdata[] = [];
//   ns = '';
//   load = false;

//   constructor(private _router: Router, private auth: AuthService) { }

//   ngOnInit(): void {}

//   driver(name: string): void {
//     this.load = true;
//     this.mp = false;
//     this.drvr = [];
//     firebase.database().ref('/DriverData/' + name).once('value').then((snapshot) => {
//       this.drvr.push({
//         name: snapshot.val().Name,
//         dob: snapshot.val().DOB,
//         tasks: snapshot.val().Tasks,
//         beta: snapshot.val().Beta,
//         monthly: snapshot.val().Monthly,
//         vehicle: snapshot.val().Vehicle,
//         salary: snapshot.val().Salary,
//         attendance: snapshot.val().Attendance,
//         experience: snapshot.val().Experience
//       });
//     }).then(() => {
//       this.ns = name;
//       this.load = false;
//     });
//   }

//   vis(inp: string): void {
//     (document.getElementById(inp) as HTMLInputElement).style.display = 'flex';
//     if (inp === 'sal') {
//       (document.getElementById('Salary') as HTMLInputElement).focus();
//     } else {
//       (document.getElementById('Beta') as HTMLInputElement).focus();
//     }
//   }

//   hide(inp: string): void {
//     (document.getElementById(inp) as HTMLInputElement).style.display = 'none';
//   }

//   back(): void {
//     this.mp = true;
//   }

//   update(e: KeyboardEvent, name: string, pa: any, id: string): void {
//     if (e.key === 'Enter') {
//       let am: any = (document.getElementById(id) as HTMLInputElement).value;
//       am = parseInt(am, 10);
//       am = am + pa;
//       if (id === 'Salary') {
//         firebase.database().ref('DriverData/' + name).update({ Salary: am }).then(() => {
//           this.driver(name);
//         });
//       } else {
//         firebase.database().ref('DriverData/' + name).update({ Beta: am }).then(() => {
//           this.driver(name);
//         });
//       }
//     }
//   }

//   logout(): void {
//     this.auth.logout();
//     this._router.navigate(['']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DriverData } from '../interfaces/driverdata';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update, child } from 'firebase/database';
import { environment } from '../../environments/environment';

// Initialize Firebase App and Database once
const firebaseApp = initializeApp(environment.firebaseConfig);
const db = getDatabase(firebaseApp);

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  mp = true;
  drivers: DriverData[] = [];
  drvr: DriverData[] = [];
  ns = '';
  load = false;

  constructor(private _router: Router, private auth: AuthService) { }

  ngOnInit(): void {}

  driver(name: string): void {
    this.load = true;
    this.mp = false;
    this.drvr = [];

    const dbRef = ref(db);
    get(child(dbRef, `DriverData/${name}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.drvr.push({
          name: data.Name,
          dob: data.DOB,
          tasks: data.Tasks,
          beta: data.Beta,
          monthly: data.Monthly,
          vehicle: data.Vehicle,
          salary: data.Salary,
          attendance: data.Attendance,
          experience: data.Experience
        });
      }
    }).finally(() => {
      this.ns = name;
      this.load = false;
    });
  }

  vis(inp: string): void {
    const el = document.getElementById(inp) as HTMLInputElement;
    el.style.display = 'flex';
    if (inp === 'sal') {
      (document.getElementById('Salary') as HTMLInputElement)?.focus();
    } else {
      (document.getElementById('Beta') as HTMLInputElement)?.focus();
    }
  }

  hide(inp: string): void {
    (document.getElementById(inp) as HTMLInputElement).style.display = 'none';
  }

  back(): void {
    this.mp = true;
  }

  update(e: KeyboardEvent, name: string, pa: any, id: string): void {
    if (e.key === 'Enter') {
      let am: any = (document.getElementById(id) as HTMLInputElement).value;
      am = parseInt(am, 10);
      am += pa;

      const updates: any = {};
      updates[id] = am;

      update(ref(db, `DriverData/${name}`), updates).then(() => {
        this.driver(name);
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this._router.navigate(['']);
  }
}
