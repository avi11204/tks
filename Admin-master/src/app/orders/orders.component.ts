// import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../services/auth.service';
// import {Router} from '@angular/router';
// import {ordersList} from 'src/app/interfaces/orderslist';
// import * as firebase from 'firebase';
// import { QuicknavComponent } from '../quicknav';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
// })
// export class OrdersComponent implements OnInit {

//   mp = true;
//   pe = false;
//   ap = false;
//   dp = false;
//   cp = false;
//   ddb = false;
//   adb = false;
//   processing_i = 0;
//   approved_i = 0;
//   delivered_i = 0;
//   cancelled_i = 0;
//   orders: ordersList[] = [];
//   pos: ordersList[] = [];
//   fos: ordersList[] = [];
//   disos: ordersList[] = [];
//   ids: any[] = [];
//   load = true;
//   mload = true;
//   aab = false;
//   rb = false;
//   page_name = '';
//   in = 0;
//   pr = [{item: 'Gravels', price: 10000}, {item: 'Sand', price: 20000}, {item: 'Cement', price: 30000}, {item: 'Water', price: 500}];
//   est = 0;
//   type = '';
//   ctype = '';

//   constructor(private _router: Router, private auth: AuthService) {

//    }

//   ngOnInit(): void {
//     this.fb(1);
//     (document.getElementById('place') as HTMLElement).setAttribute('data-dismiss', 'modal');
//   }

//   fb(a: number){
//     this.load = true;
//     firebase.database().ref('/orderdata/').once('value').then((snapshot) => {
//       this.orders = [];
//       this.processing_i = 0;
//       this.approved_i = 0;
//       this.delivered_i = 0;
//       this.cancelled_i = 0;
//       snapshot.forEach((child) => {
//           child.forEach((inchild) => {
//             if (inchild.val().status === 'Processing'){
//               this.processing_i++;
//             }
//             else if (inchild.val().status === 'Approved'){
//               this.approved_i++;
//             }
//             else if (inchild.val().status === 'Delivered'){
//               this.delivered_i++;
//             }
//             else{
//               this.cancelled_i++;
//             }
//             firebase.database().ref('/user/' + child.key).once('value').then((snapshot) => {
//               this.type = snapshot.val().type;
//               this.orders.push({id: inchild.val().orderid, date: inchild.val().orderdate, item: inchild.val().item, status: inchild.val().status, price: inchild.val().price, quantity: inchild.val().quantity, address: inchild.val().address, area: inchild.val().area, delivery: inchild.val().deliverydate, phone: child.key, type: this.type});
//             }).catch(() => {
//               this.type = 'common';
//               this.orders.push({id: inchild.val().orderid, date: inchild.val().orderdate, item: inchild.val().item, status: inchild.val().status, price: inchild.val().price, quantity: inchild.val().quantity, address: inchild.val().address, area: inchild.val().area, delivery: inchild.val().deliverydate, phone: child.key, type: this.type});
//             });
//             });
//       });
//       this.load = false;
//       this.fos = this.orders;
//     });
//   }

//   logout(){
//     this.auth.logout();
//     this._router.navigate(['']);
//   }

//   itemfil(item: string){
//     this.mload = true;
//     this.mp = false;
//     this.aab = true;
//     this.rb = true;
//     this.pe = true;
//     this.pos = [];
//     if (this.in === 1){
//     this.pos = this.orders.filter((o) => {
//       if (o.item === item && o.status === 'Processing') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 2){
//     this.pos = this.orders.filter((o) => {
//       if (o.item === item && o.status === 'Approved') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 3){
//     this.pos = this.orders.filter((o) => {
//       if (o.item === item && o.status === 'Delivered') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 4){
//     this.pos = this.orders.filter((o) => {
//       if (o.item === item && o.status === 'Cancelled') {
//         return true;
//       }
//       return false;
//     });
//   }
//     this.ids = [];
//     this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//     if (this.pos.length > 0) {
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//     }

//     custfil(item: string){
//       this.mload = true;
//       this.mp = false;
//       this.aab = true;
//       this.rb = true;
//       this.pe = true;
//       this.pos = [];
//       if (this.in === 1){
//       this.pos = this.orders.filter((o) => {
//         if (o.type === item && o.status === 'Processing') {
//           return true;
//         }
//         return false;
//       });
//     }
//     else if (this.in === 2){
//       this.pos = this.orders.filter((o) => {
//         if (o.type === item && o.status === 'Approved') {
//           return true;
//         }
//         return false;
//       });
//     }
//     else if (this.in === 3){
//       this.pos = this.orders.filter((o) => {
//         if (o.type === item && o.status === 'Delivered') {
//           return true;
//         }
//         return false;
//       });
//     }
//     else if (this.in === 4){
//       this.pos = this.orders.filter((o) => {
//         if (o.type === item && o.status === 'Cancelled') {
//           return true;
//         }
//         return false;
//       });
//     }
//       this.ids = [];
//       this.fos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//       if (this.fos.length > 0) {
//         setTimeout(() => {this.displayData(this.fos[0].id); }, 200);
//       }
//       else {
//         this.pos = [];
//       }
//   }

//   pending(){
//     this.in = 1;
//     this.page_name = 'Pending';
//     this.mload = true;
//     this.mp = false;
//     this.aab = true;
//     this.ddb = false;
//     this.adb = true;
//     this.rb = true;
//     this.pe = true;
//     this.pos = [];
//     this.pos = this.orders.filter((o) => {
//       if (o.status === 'Processing') {
//         return true;
//       }
//       return false;
//     });
//     this.ids = [];
//     if (this.pos.length > 0){
//       this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//     }

//   assigned(){
//     this.in = 2;
//     this.page_name = 'Approved';
//     this.mload = true;
//     this.mp = false;
//     this.pe = true;
//     this.aab = false;
//     this.ddb = true;
//     this.adb = false;
//     this.rb = true;
//     this.pos = [];
//     this.pos = this.orders.filter((o) => {
//       if (o.status === 'Approved') {
//         return true;
//       }
//       return false;
//     });
//     this.ids = [];
//     this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//     if (this.pos.length > 0) {
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//   }

//   cancelled(){
//     this.in = 4;
//     this.page_name = 'Cancelled';
//     this.mload = true;
//     this.mp = false;
//     this.pe = true;
//     this.aab = false;
//     this.ddb = false;
//     this.adb = false;
//     this.rb = false;
//     this.pos = [];
//     this.pos = this.orders.filter((o) => {
//       if (o.status === 'Cancelled') {
//         return true;
//       }
//       return false;
//     });
//     this.ids = [];
//     this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//     if (this.pos.length > 0) {
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//   }

//   delivered(){
//     this.in = 3;
//     this.page_name = 'Delivered';
//     this.mload = true;
//     this.mp = false;
//     this.pe = true;
//     this.aab = false;
//     this.ddb = false;
//     this.adb = false;
//     this.rb = false;
//     this.pos = [];
//     this.pos = this.orders.filter((o) => {
//       if (o.status === 'Delivered') {
//         return true;
//       }
//       return false;
//     });
//     this.ids = [];
//     this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//     if (this.pos.length > 0) {
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//   }

//   back(){
//     this.mp = true;
//     this.pe = false;
//     this.fb(1);
//   }

//   displayData(id: any){
//     this.mload = false;
//     this.ids.push(id);
//     if (this.ids.length == 2){
//       (document.getElementById(this.ids[0]) as HTMLDivElement).classList.remove('bg');
//       this.ids.shift();
//     }
//     (document.getElementById(id) as HTMLDivElement).classList.add('bg');
//     const item = document.getElementById('item-dis') as HTMLElement;
//     const phone = document.getElementById('phone-dis') as HTMLElement;
//     const delivery = document.getElementById('delivery-dis') as HTMLElement;
//     const reference = document.getElementById('reference-dis') as HTMLElement;
//     const date = document.getElementById('date-dis') as HTMLElement;
//     const address = document.getElementById('address-dis') as HTMLElement;
//     const area = document.getElementById('area-dis') as HTMLElement;
//     const item_bill = document.getElementById('item-dis-bill') as HTMLElement;
//     const status = document.getElementById('status-dis') as HTMLElement;
//     const price = document.getElementById('price-dis') as HTMLElement;
//     const quantity = document.getElementById('quantity-dis') as HTMLElement;
//     const total = document.getElementById('total-dis') as HTMLElement;

//     this.disos = this.pos.filter(function(or){
//       if (or.id === id) {
//         return true;
//       }
//       return false;
//     });

//     item.innerHTML = this.disos[0].item;
//     delivery.innerHTML = this.disos[0].delivery;
//     reference.innerHTML = this.disos[0].id;
//     date.innerHTML = this.disos[0].date;
//     phone.innerHTML = this.disos[0].phone;
//     address.innerHTML = this.disos[0].address;
//     area.innerHTML = this.disos[0].area;
//     item_bill.innerHTML = this.disos[0].item;
//     status.innerHTML = this.disos[0].status;
//     const tot = parseInt(this.disos[0].price) / this.disos[0].quantity;
//     price.innerHTML = tot.toString();
//     quantity.innerHTML = this.disos[0].quantity.toString();
//     total.innerHTML = this.disos[0].price;
//     const idd = this.disos[0].id;
//     const phh = this.disos[0].phone;
//     let un = '';
//     firebase.database().ref('/user/' + phh).once('value').then((snapshot) => {
//       un = snapshot.val().username;
//     }).then(() => {
//       if (this.disos[0].status === 'Processing'){
//         (document.getElementById('aaab') as HTMLButtonElement).onclick = () => {
//           this.processbtn(idd, phh, un);
//         };
//       }
//       if (this.disos[0].status === 'Approved'){
//         (document.getElementById('dddb') as HTMLButtonElement).onclick = () => {
//           this.deliverbtn(idd, phh);
//         };
//       }
//       (document.getElementById('rrb') as HTMLButtonElement).onclick = () => {
//         this.rejbtn(idd, phh);
//       };
//     });
//   }

//   processbtn(id: any, phone: any, un: string){
//     const i = 0;
//     this.mload = true;
//     const drs = (document.getElementById('driversel') as HTMLSelectElement).value;
//     firebase.database().ref('/orderdata/' + phone + '/' + id).update({
//       status: 'Approved'
//     }).then(() => {
//       this.assignapprove(id, drs, phone, un);
//     });
//   }

//   assignapprove(id: any, driver: string, phone: any, un: string){
//     this.fos = this.pos.filter(function(or){
//       if (or.id === id) {
//         return true;
//       }
//       return false;
//     });
//     const del = this.fos[0].delivery;
//     const d = del.slice(4, 6);
//     let m = del.slice(0, 3);
//     const y = del.slice(7, 11);
//     if (m == 'Jan') {
//       m = '01';
//     }
//     else if (m == 'Feb') {
//       m = '02';
//  }
//     else if (m == 'Mar') {
//       m = '03';
//  }
//     else if (m == 'Apr') {
//       m = '04';
//  }
//     else if (m == 'May') {
//       m = '05';
//  }
//     else if (m == 'Jun') {
//       m = '06';
//  }
//     else if (m == 'Jul') {
//       m = '07';
//  }
//     else if (m == 'Aug') {
//       m = '08';
//  }
//     else if (m == 'Sep') {
//       m = '09';
//  }
//     else if (m == 'Oct') {
//       m = '10';
//  }
//     else if (m == 'Nov') {
//       m = '11';
//  }
//     else {
//       m = '12';
//  }
//     const date = d + '-' + m + '-' + y;
//     firebase.database().ref('/approvedorders/' + driver + '/' + date + '/' + id).set({
//       orderid: id,
//       custname: un,
//       custphone: this.fos[0].phone,
//       deldate: this.fos[0].delivery,
//       item: this.fos[0].item,
//       quantity: this.fos[0].quantity,
//       area: this.fos[0].area,
//     }).then(() => {
//     if (this.orders.length > 0){
//       this.orders.splice(this.orders.findIndex(a => a.id === id), 1);
//       setTimeout(() => {this.pending(); }, 200);
//     }
//     else {
//       this.orders = [];
//     }
//     });
//   }

//   rejbtn(id: any, phone: any){
//     this.mload = true;
//     firebase.database().ref('/orderdata/' + phone + '/' + id).update({
//       status: 'Cancelled'
//     }).then(() => {
//       if (this.orders.length > 0){
//         this.orders.splice(this.orders.findIndex(a => a.id === id), 1);
//         if (this.in === 1) {
//           setTimeout(() => {this.pending(); }, 200);
//         }
//         if (this.in === 2) {
//           setTimeout(() => {this.assigned(); }, 200);
//         }
//         if (this.in === 3) {
//           setTimeout(() => {this.delivered(); }, 200);
//         }
//         if (this.in === 4) {
//           setTimeout(() => {this.cancelled(); }, 200);
//         }
//       }
//       else {
//         this.orders = [];
//       }
//       });
//   }

//   deliverbtn(id: any, phone: any){
//     let i = 0;
//     this.mload = true;
//     firebase.database().ref('/orderdata/' + phone + '/' + id).update({
//       status: 'Delivered'
//     }).then(() => {
//       if (this.orders.length > 0){
//         this.orders.splice(this.orders.findIndex(a => a.id === id), 1);
//         console.log(i++);
//         setTimeout(() => {this.assigned(); }, 200);
//       }
//       else {
//         this.orders = [];
//       }
//       });
//   }

//   manually(){
//     const phone = (document.getElementById('phn') as HTMLInputElement).value;
//     const item = (document.getElementById('item') as HTMLInputElement).value;
//     const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
//     const address = (document.getElementById('address') as HTMLInputElement).value;
//     const area = (document.getElementById('area') as HTMLInputElement).value;
//     const status = (document.getElementById('status') as HTMLInputElement).value;
//     let deldate = (document.getElementById('deldate') as HTMLInputElement).value;
//     deldate = (new Date(deldate)).toString();
//     const ddate = deldate.slice(4, 15);
//     let date = (new Date()).toString();
//     date = date.slice(4, 15);
//     const dateid = (new Date());
//     const id = parseInt(((dateid.getDate()).toString()) + ((dateid.getMonth()).toString()) + ((dateid.getFullYear()).toString()) + ((dateid.getTime()).toString()));
//     this.load = true;
//     firebase.database().ref('orderdata/' + phone + '/' + id).set({
//       address,
//       area,
//       deliverydate: ddate,
//       item,
//       orderdate: date,
//       orderid: id,
//       price: this.est,
//       quantity,
//       status,
//     }).then(() => {
//       this.fb(1);
//     });
//   }

//   price(){
//     const typesel = (document.getElementById('item') as HTMLInputElement).value;
//     if (typesel === '') {
//       this.est = 0;
//     }
//     else{
//       const p = this.pr.findIndex(x => x.item === typesel);
//       const quant = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
//       this.est = quant * this.pr[p].price;
//       if (isNaN(this.est)){
//         this.est = 0;
//       }
//     }
//   }

//   phfilter(item: string){
//     this.mload = true;
//     this.mp = false;
//     this.aab = true;
//     this.rb = true;
//     this.pe = true;
//     this.pos = [];
//     if (this.in === 1){
//     this.pos = this.orders.filter((o) => {
//       if (o.phone === item && o.status === 'Processing') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 2){
//     this.pos = this.orders.filter((o) => {
//       if (o.phone === item && o.status === 'Approved') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 3){
//     this.pos = this.orders.filter((o) => {
//       if (o.phone === item && o.status === 'Delivered') {
//         return true;
//       }
//       return false;
//     });
//   }
//   else if (this.in === 4){
//     this.pos = this.orders.filter((o) => {
//       if (o.phone === item && o.status === 'Cancelled') {
//         return true;
//       }
//       return false;
//     });
//   }
//     this.ids = [];
//     this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
//     if (this.pos.length > 0) {
//       setTimeout(() => {this.displayData(this.pos[0].id); }, 200);
//     }
//     else {
//       this.pos = [];
//     }
//     }

//   searchph(e: KeyboardEvent){
//     const ps = (document.getElementById('search') as HTMLInputElement).value;
//     if (ps === ''){
//       this.clearfil();
//     }
//     if (e.keyCode === 13){
//       const ps = (document.getElementById('search') as HTMLInputElement).value;
//       this.phfilter(ps);
//     }
//   }

//   clearfil(){
//     if (this.in === 1){
//       this.pending();
//       }
//     else if (this.in === 2){
//       this.assigned();
//       }
//     else if (this.in === 3){
//       this.delivered();
//       }
//     else if (this.in === 4){
//       this.cancelled();
//       }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  selectedStatus = 'all';

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.db.list('orders').snapshotChanges().subscribe(orderSnapshots => {
      this.orders = orderSnapshots.map(orderSnapshot => {
        const data = orderSnapshot.payload.val();
        const key = orderSnapshot.key;
        return { key, ...(data as object) };
      });
    });
  }

  updateOrderStatus(order: any, status: string): void {
    const updates: any = {};
    updates[`orders/${order.key}/status`] = status;

    this.db.object('/').update(updates)
      .then(() => console.log(`Order status updated to ${status}`))
      .catch(error => console.error('Error updating order status:', error));
  }

  showOrdersByStatus(status: string): void {
    this.selectedStatus = status;
  }

  filteredOrders(): any[] {
    return this.selectedStatus === 'all'
      ? this.orders
      : this.orders.filter(order => order.status === this.selectedStatus);
  }
}
