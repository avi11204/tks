// import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../services/auth.service';
// import {ChildActivationStart, Router} from '@angular/router';
// import * as firebase from 'firebase';
// import {cust_reg} from 'src/app/interfaces/customers';
// import {prods} from 'src/app/interfaces/products';
// import {pend} from 'src/app/interfaces/pending';
// import { identifierModuleUrl, rendererTypeName } from '@angular/compiler';
// declare var Chart: any;

// @Component({
//   selector: 'app-quicknav',
//   templateUrl: './quicknav.component.html',
//   styleUrls: ['./quicknav.component.css']
// })
// export class QuicknavComponent implements OnInit {

//   processing = 0;
//   approved = 0;
//   delivered = 0;
//   cancelled = 0;
//   totalor = 0;
//   cprice = 0;
//   gprice = 0;
//   sprice = 0;
//   wprice = 0;
//   ci = 0;
//   gi = 0;
//   si = 0;
//   wi = 0;
//   ti = 0;
//   regload = true;
//   custreg: cust_reg[] = [];
//   products: prods[] = [];
//   dataload = true;
//   proload = true;
//   pending: pend[] = [];
//   completed: pend[] = [];
//   count = 0;

//   constructor(private _router: Router, private auth: AuthService) {

//   }

//   ngOnInit(): void {
//     firebase.database().ref('/orderdata/').once('value').then((snapshot) => {
//       snapshot.forEach((child) => {
//           child.forEach((inchild) => {
//             if (inchild.val().status === 'Processing') {
//               this.processing++;
//             }
//             else if (inchild.val().status === 'Approved') {
//               this.approved++;
//  }
//             else if (inchild.val().status === 'Delivered') {
//               this.delivered++;
//  }
//             else {
//               this.cancelled++;
//  }
//           });
//           child.forEach((inchild) => {
//             if (inchild.val().item === 'Cement'){
//               this.cprice = this.cprice + inchild.val().price;
//               this.ci++;
//             }
//             else if (inchild.val().item === 'Sand'){
//               this.sprice = this.sprice + inchild.val().price;
//               this.si++;
//             }
//             else if (inchild.val().item === 'Gravels'){
//               this.gprice = this.gprice + inchild.val().price;
//               this.gi++;
//             }
//             else{
//               this.wprice = this.wprice + inchild.val().price;
//               this.wi++;
//             }
//           });
//       });
//     }).then(() => {
//       this.ordersummary();
//       this.totalor = this.processing + this.approved + this.delivered + this.cancelled;
//       this.dataload = false;
//       this.ti = this.ci + this.si + this.gi + this.wi;
//       this.ci = Math.round((this.ci / this.ti) * 100);
//       this.gi = Math.round((this.gi / this.ti) * 100);
//       this.si = Math.round((this.si / this.ti) * 100);
//       this.wi = Math.round((this.wi / this.ti) * 100);
//       (document.getElementById('cl') as HTMLSpanElement).style.width = this.ci + '%';
//       (document.getElementById('gl') as HTMLSpanElement).style.width = this.gi + '%';
//       (document.getElementById('sl') as HTMLSpanElement).style.width = this.si + '%';
//       (document.getElementById('wl') as HTMLSpanElement).style.width = this.wi + '%';
//       this.customers();
//       this.prods();
//       this.pricesummary();
//       this.tasks();
//     });
//     (document.getElementById('tadd') as HTMLElement).setAttribute('data-dismiss', 'modal');
//   }

//   customers(){
//     this.regload = true;
//     this.custreg = [];
//     firebase.database().ref('/user/').once('value').then((snapshot) => {
//       snapshot.forEach((child) => {
//         if (child.val().type === 'regular') {
//           this.custreg.push({name: child.val().username, phone: child.val().phone});
//         }
//         });
//       this.regload = false;
//       });

//   }

//   removereg(ph: number){
//     firebase.database().ref('/user/' + ph).update({
//         type: 'common'
//       }).then(() => {this.customers(); });

//   }

//   pricesummary(){
//     const ctx = (document.getElementById('line-chart-container') as HTMLCanvasElement).getContext('2d');
//     const myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: ['Sand', 'Cement', 'Gravels', 'Water'],
//             datasets: [{
//                 data: [this.sprice, this.cprice, this.gprice, this.wprice],
//                 pointBackgroundColor: 'white',
//                 pointBorderColor: 'gold',
//                 lineTension: 0.5,
//                 borderWidth: 2,
//                 pointRadius: 5,
//                 borderColor: '#3e95cd',
//                 fill: false
//             }]
//         },
//         options: {
//           responsive: false,
//           maintainAspectRatio: false,
//             title: {
//               display: false,
//             },
//             layout: {
//               padding: {
//                 left: 40,
//                 right: 40,
//                 top: 15,
//                 bottom: 15,
//               }
//             },
//             legend: {
//               display: false,
//             },
//             animation: {
//               animationScale: true,
//               animateRotate: true
//             },
//             scales: {
//                 xAxes: [{
//                   gridLines: {
//                     display: false
//                   },
//                   ticks: {
//                     fontSize: 12,
//                     padding: 10,
//                     maxRotation: 15,
//                     minRotation: 15,
//                     fontFamily: 'Helvetica',
//                     fontStyle: 'bold',
//                     display: true
//                 }
//                 }],
//                 yAxes: [{
//                   gridLines: {
//                     display: true
//                   },
//                   ticks: {
//                       display: false
//                   }
//                 }]
//             }
//         }
//     });
//     myChart.render();
//   }

//   ordersummary(){
//     const ctx = (document.getElementById('chart-container') as HTMLCanvasElement).getContext('2d');
//     const myChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Processing', 'Approved', 'Delivered', 'Cancelled'],
//             datasets: [{
//                 data: [this.processing, this.approved, this.delivered, this.cancelled],
//                 backgroundColor: [
//                     'gold',
//                     'chocolate',
//                     'limegreen',
//                     'tomato',
//                 ],
//                 borderColor: [
//                   'gold',
//                   'chocolate',
//                   'limegreen',
//                   'tomato',
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//           responsive: false,
//           maintainAspectRatio: false,
//             title: {
//               display: false,
//             },
//             layout: {
//               padding: {
//                 left: 50,
//                 right: 50,
//                 top: 10,
//                 bottom: 10,
//               }
//             },
//             legend: {
//               display: false,
//             },
//             animation: {
//               animationScale: true,
//               animateRotate: true
//             },
//             scales: {
//                 xAxes: [{
//                   gridLines: {
//                     display: false
//                   },
//                   ticks: {
//                     display: false
//                 }
//                 }],
//                 yAxes: [{
//                   gridLines: {
//                     display: false
//                   },
//                   ticks: {
//                       display: false
//                   }
//                 }]
//             }
//         }
//     });
//     myChart.render();
//   }

//   chpr(idd: string){
//     (document.getElementById(idd) as HTMLInputElement).classList.toggle('hidden');
//     (document.getElementById(idd) as HTMLInputElement).focus();
//   }

//   prods(){
//     this.proload = true;
//     this.products = [];
//     firebase.database().ref('/products/').once('value').then((snapshot) => {
//       snapshot.forEach((child) => {
//         this.products.push({item: child.val().item, price: child.val().price, avail: child.val().availability});
//       });
//       this.proload = false;
//     });
//   }

//   uppr(e: KeyboardEvent, idd: string){
//     (document.getElementById(idd) as HTMLInputElement).style.border = '1px solid gray';
//     const pr = (document.getElementById(idd) as HTMLInputElement).value;
//     if (e.keyCode == 13){
//       if (pr === '')
//       {
//         const pr = (document.getElementById(idd) as HTMLInputElement).style.border = '1px solid red';
//       }
//       else{
//         (document.getElementById(idd) as HTMLInputElement).value = '';
//         (document.getElementById(idd) as HTMLInputElement).classList.toggle('hidden');
//         if (idd === 'sp') {
//           firebase.database().ref('/products/Sand').update({price: pr}).then(() => {this.prods(); });
//         }
//         else if (idd === 'cp') {
//           firebase.database().ref('/products/Cement').update({price: pr}).then(() => {this.prods(); });
//  }
//         else if (idd === 'gp') {
//           firebase.database().ref('/products/Gravels').update({price: pr}).then(() => {this.prods(); });
//  }
//         else {
//           firebase.database().ref('/products/Water').update({price: pr}).then(() => {this.prods(); });
//  }
//       }

//     }
//   }

//   avail(id: string){
//     const ele = (document.getElementById(id) as HTMLElement);
//     if (ele.classList.contains('avail')){
//       ele.classList.remove('avail');
//       ele.classList.add('noavail');
//       firebase.database().ref('/products/' + id).update({
//         availability: 'unavailable'
//       });
//     }
//     else{
//       ele.classList.remove('noavail');
//       ele.classList.add('avail');
//       firebase.database().ref('/products/' + id).update({
//         availability: 'available'
//       });
//     }
//   }

//   addtask(){
//     const tn = (document.getElementById('tn') as HTMLInputElement).value;
//     const des = (document.getElementById('desc') as HTMLInputElement).value;
//     const lbc = (document.getElementById('lb') as HTMLInputElement).value;
//     const dt = (document.getElementById('dt') as HTMLInputElement).value;
//     const dateid = (new Date());
//     const id = parseInt(((dateid.getDate()).toString()) + ((dateid.getMonth()).toString()) + ((dateid.getFullYear()).toString()) + ((dateid.getTime()).toString()));
//     firebase.database().ref('/tasks/' + id).set({
//       id,
//       task: tn,
//       description: des,
//       label: lbc,
//       datetime: dt,
//       status: 'Pending'
//     }).then(() => {
//       (document.getElementById('taskadd') as HTMLDivElement).style.display = 'none';
//       this.tasks();
//     });
//   }

//   tasks(){
//     this.completed = [];
//     this.pending = [];
//     this.count = 0;
//     firebase.database().ref('/tasks/').once('value').then((snapshot) => {
//       snapshot.forEach((child) => {
//         if (child.val().status === 'Pending'){
//           this.pending.push({task: child.val().task, label: child.val().label, desc: child.val().description, dt: child.val().datetime, id: child.val().id});
//           this.count++;
//         }
//         else {
//           this.completed.push({task: child.val().task, label: child.val().label, desc: child.val().description, dt: child.val().datetime, id: child.val().id});
//         }
//       });
//     });
//   }

//   donetask(id: string){
//     firebase.database().ref('/tasks/' + id).update({
//       status: 'Completed'
//     }).then(() => {
//       this.tasks();
//     });
//   }

//   deletetask(id: string){
//     firebase.database().ref('/tasks/' + id).remove().then(() => {
//       this.tasks();
//     });
//   }

//   logout(){
//     this.auth.logout();
//     this._router.navigate(['']);
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.css'],
})
export class QuicknavComponent {
  tasksList: string[] = [];

  customers(): void {
    console.log('Navigating to customers page...');
  }

  removereg(ph: number): void {
    console.log(`Removing registration for phone number: ${ph}`);
  }

  pricesummary(): void {
    console.log('Showing price summary...');
  }

  ordersummary(): void {
    console.log('Showing order summary...');
  }

  chpr(idd: string): void {
    const input = document.getElementById(idd) as HTMLInputElement;
    if (input.value === '') {
      input.style.border = '1px solid red';
    } else {
      input.style.border = '';
    }
  }

  uppr(e: KeyboardEvent, idd: string): void {
    if (e.key === 'Enter') {
      this.chpr(idd);
    }
  }

  prods(): void {
    console.log('Showing products...');
  }

  avail(id: string): void {
    console.log(`Checking availability for product ID: ${id}`);
  }

  addtask(): void {
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const task = taskInput.value.trim();
    if (task) {
      this.tasksList.push(task);
      taskInput.value = '';
    }
  }

  tasks(): void {
    console.log('Current tasks:', this.tasksList);
  }

  donetask(index: number): void {
    this.tasksList[index] = `[Done] ${this.tasksList[index]}`;
  }

  deletetask(index: number): void {
    this.tasksList.splice(index, 1);
  }

  logout(): void {
    console.log('Logging out...');
  }
}
