import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _http: HttpClient,private cons: Globals) { }

  register(admin) {
       let object={
        name:admin.name,
        password: admin.password,
        user_name: admin.email,
        contact_number: admin.phone
       }

    return this._http.post(this.cons.url+"admin/register", object);
  }
  login(admin) {
    return this._http.post(this.cons.url+"admin/login", admin);
    // localStorage.setItem('user', user)
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['dashboard/login']);
  }

  isAuthenticated() {
    return localStorage.getItem('admin');
  }
}
