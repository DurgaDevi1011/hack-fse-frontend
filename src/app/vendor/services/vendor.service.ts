import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const localstorage = JSON.parse(localStorage.getItem('vendor'));
@Injectable()
export class VendorService {
  constructor(private http: HttpClient, private myglobals: Globals) { }

  apiUrl = "vendor";
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

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /* getVendors(): Observable<any> {
    return this.http.get(`${baseUrl}/${apiUrl}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  } */

  getVendor(username: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/${username}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateVendor(user_name, data): Observable<any> {
    console.log(user_name);
    console.log(data);
    data.audit_user = user_name;
    return this.http.put(`${this.baseUrl}${this.apiUrl}/${user_name}`, data, httpOptions)

      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVendor(id: string): Observable<{}> {
    const url = `${this.baseUrl}${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrdersBelongsToVendor(): Observable<any> {

    const sub = 'orders/getorders';
    const url = `${this.baseUrl}${sub}/${localstorage.vendor_id}`;
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateOrder(id, data): Observable<any> {
    const sub = 'orders';
    return this.http.put(`${this.baseUrl}${sub}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}