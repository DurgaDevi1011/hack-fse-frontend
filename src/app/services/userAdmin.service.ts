import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from './userAuth.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})


export class UserAdminService {

    baseUrl: string = "http://localhost:8585";

    constructor(private _router: Router, private _auth: UserAuthService, private _http: HttpClient) { }

    getAdminUser() {
        let token;

        if (this._auth.isAuthenticated()) {
            const Userdash = JSON.parse(this._auth.isAuthenticated());
            token = Userdash.token ? Userdash.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "/admin/list", headerOption);
    }

    getUser(id: string): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const Userdash = JSON.parse(this._auth.isAuthenticated());
            token = Userdash.token ? Userdash.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "/user/" + id, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateUser(id: string, dataObject: object): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const Userdash = JSON.parse(this._auth.isAuthenticated());
            token = Userdash.token ? Userdash.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token
            })
        }
        return this._http.put(this.baseUrl + "/user/" + id, dataObject, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));;
    }

    /*getcartData(id: string): Observable<any> {
        console.log(id);
        let token;

        if (this._auth.isAuthenticated()) {
            const Userdash = JSON.parse(this._auth.isAuthenticated());
            token = Userdash.token ? Userdash.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get("http://localhost:8585/orders/cart/getordersatcart/" + id).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }*/

    addtocart(order) {
        //  console.log('test order');
        return this._http.post("http://localhost:8585/orders/addorder", order);
    }
    getcartData(id: string): Observable<any> {
        const url = `http://localhost:8585/orders/getorders/cart/${id}`;
        return this._http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

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



}
