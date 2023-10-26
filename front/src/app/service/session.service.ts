import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setInfo(userid: string) {
    localStorage.setItem('USERNAME_ID', userid);
  }

  getInfo() {
    return localStorage.getItem('USERNAME_ID');
  }

  logOut() {
    localStorage.removeItem('USERNAME_ID');
  }
}
