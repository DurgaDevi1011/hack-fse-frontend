import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _router: Router, private _http: HttpClient) { }

  register(user) {
    return this._http.post("http://localhost:3000/user/register", user);
  }
  login(user) {
    return this._http.post("http://localhost:3000/user/login", user);
  }

  logout() {
    localStorage.clear();
   // this._router.navigate(['']);
  }

  isAuthenticated() {
    return localStorage.getItem('user');
  }
}
