import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/interfaces/feed';
import { MiscCusts } from 'src/app/interfaces/misc_cust';

import { getDatabase, ref, get, update, remove, child } from 'firebase/database';
import { getApp } from 'firebase/app';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {
  feedback: Feedback[] = [];
  customers: MiscCusts[] = [];

  type = '';
  mainPage = true;
  feedbackPage = false;
  userPage = false;
  load = true;

  orders = 0;
  serialNumber = 0;
  regularUsers = 0;
  commonUsers = 0;
  feedbackSum = 0;
  feedbackCount = 0;

  db = getDatabase(getApp());

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.refreshCounts();
  }

  refreshCounts = (): void => {
    this.load = true;
    this.regularUsers = 0;
    this.commonUsers = 0;
    this.feedbackSum = 0;
    this.feedbackCount = 0;

    get(ref(this.db, '/user/')).then((snapshot: any) => {
      snapshot.forEach((child: any) => {
        if (child.val().type === 'regular') {
          this.regularUsers++;
        } else {
          this.commonUsers++;
        }
      });
    }).then(() => {
      return get(ref(this.db, '/feedback/'));
    }).then((snapshot: any) => {
      snapshot.forEach((child: any) => {
        this.feedbackSum += parseInt(child.val().percent, 10);
        this.feedbackCount++;
      });
      this.feedbackSum = this.feedbackCount > 0
        ? parseFloat((this.feedbackSum / this.feedbackCount).toFixed(2))
        : 0;
      this.load = false;
    });
  }

  feedbackPageHandler = (): void => {
    this.load = true;
    this.mainPage = false;
    this.userPage = false;
    this.feedbackPage = true;
    this.feedback = [];

    get(ref(this.db, '/feedback/')).then((snapshot: any) => {
      const promises: Promise<void>[] = [];

      snapshot.forEach((child: any) => {
        const feedbackData = child.val();
        const userKey = child.key;

        const promise = get(ref(this.db, '/user/' + userKey)).then((userSnapshot: any) => {
          const userData = userSnapshot.val();
          this.feedback.push({
            feed: feedbackData.feedback,
            percent: feedbackData.percent,
            time: feedbackData.time,
            user: userKey,
            type: userData?.type ?? 'common',
            username: userData?.username ?? 'Anonymous'
          });
        }).catch(() => {
          this.feedback.push({
            feed: feedbackData.feedback,
            percent: feedbackData.percent,
            time: feedbackData.time,
            user: userKey,
            type: 'common',
            username: 'Anonymous'
          });
        });

        promises.push(promise);
      });

      return Promise.all(promises);
    }).then(() => {
      this.load = false;
    });
  }

  loadUsers = (): void => {
    this.serialNumber = 0;
    this.load = true;
    this.mainPage = false;
    this.feedbackPage = false;
    this.userPage = true;
    this.customers = [];

    get(ref(this.db, '/user/')).then((snapshot: any) => {
      const userPromises: Promise<void>[] = [];

      snapshot.forEach((child: any) => {
        const phone = child.val().phone;
        const name = child.val().username;
        const type = child.val().type;

        const userPromise = get(ref(this.db, '/orderdata/' + phone)).then((ordersSnapshot: any) => {
          let orders = 0;
          ordersSnapshot.forEach(() => orders++);

          this.customers.push({
            name,
            phone,
            type,
            orders
          });
        });

        userPromises.push(userPromise);
      });

      return Promise.all(userPromises);
    }).then(() => {
      this.load = false;
    });
  }

  goBack = (): void => {
    this.mainPage = true;
    this.feedbackPage = false;
    this.userPage = false;
    this.refreshCounts();
  }

  toggleSearch = (): void => {
    (document.getElementById('sph') as HTMLElement).classList.toggle('hidden');
    (document.getElementById('sphi') as HTMLInputElement).focus();
  }

  clearSearch = (): void => {
    (document.getElementById('sphi') as HTMLInputElement).value = '';
    (document.getElementById('sph') as HTMLElement).classList.toggle('hidden');
    this.loadUsers();
  }

  searchByPhone = (e: KeyboardEvent): void => {
    const searchValue = (document.getElementById('sphi') as HTMLInputElement).value;
    if (e.key === 'Enter') {
      this.customers = this.customers.filter((o) => o.phone.toString() === searchValue);
    }
  }

  changeStatus = (phone: number, type: string): void => {
    update(ref(this.db, '/user/' + phone), { type }).then(() => {
      this.loadUsers();
    });
  }

  deleteUser = (phone: number): void => {
    remove(ref(this.db, '/user/' + phone)).then(() => {
      this.loadUsers();
    });
  }

  logout = (): void => {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
