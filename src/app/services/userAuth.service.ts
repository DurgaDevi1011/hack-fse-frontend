import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router, private http: HttpClient, private myglobals: Globals) { }

  apiUrl = "user";
  baseUrl: string = this.myglobals.url;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  register(user) {
    return this.http.post("http://localhost:8585/user/register", user);
  }

  login(user) {
     console.log('login');
 console.log(user)
    return this.http.post("http://localhost:8585/user/login", user);
  }

  logout() {
    localStorage.clear();
    // this._router.navigate(['']);
  }

  isAuthenticated() {
    return localStorage.getItem('user');
  }
}
