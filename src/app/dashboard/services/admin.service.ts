import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Globals } from '../../globals';

@Injectable({
    providedIn: 'root'
})


export class AdminService {

    baseUrl: string;

    constructor(private _router: Router, private _auth: AuthService, private _http: HttpClient, private cons: Globals) {

        this.baseUrl = cons.url;
    }

    getAdminUser() {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "admin/list", headerOption);
    }

    getUser(): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "user", headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateUser(id: string, dataObject: object): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token
            })
        }
        return this._http.put(this.baseUrl + "user/" + id, dataObject, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));;
    }



    deleteUser(id: string): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.delete(this.baseUrl + "user/" + id, headerOption).pipe(
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

    getVendor(): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "vendor", headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateVendor(user_name: string, dataObject: object): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token
            })
        }
        return this._http.put(this.baseUrl + "vendor/activate/" + user_name, dataObject, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));;
    }

    deleteVendor(id: string): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.delete(this.baseUrl + "vendor/" + id, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getDeliveryBoy(): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.get(this.baseUrl + "deliveryboy", headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateDeliveryBoy(id: string, dataObject: object): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token
            })
        }
        return this._http.put(this.baseUrl + "deliveryboy/" + id, dataObject, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));;
    }

    deleteDeliveryBoy(id: string): Observable<any> {
        let token;

        if (this._auth.isAuthenticated()) {
            const adminUser = JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token : "";
        }
        const headerOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token

            })
        }
        return this._http.delete(this.baseUrl + "deliveryboy/" + id, headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

}
