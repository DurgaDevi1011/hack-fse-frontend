import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})


export class VendorService {
    
 baseUrl: string = "http://localhost:3000";

    constructor(private _router: Router,private _auth:AuthService, private _http: HttpClient) { }

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

    getVendor() : Observable<any> {
        let token;

        if(this._auth.isAuthenticated()){
            const adminUser =JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token:"";
        }
        const headerOption ={
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'authorization':token

            })
        }
        return this._http.get(this.baseUrl+"/vendor",headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateVendor(user_name: string,dataObject:object) : Observable<any> {
        let token;

        if(this._auth.isAuthenticated()){
            const adminUser =JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token:"";
        }
        const headerOption ={
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'authorization':token
            })
        }
        return this._http.put(this.baseUrl+"/activate/"+user_name,dataObject,headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));;
    }


    
    deleteVendor(id: string) : Observable<any> {
        let token;

        if(this._auth.isAuthenticated()){
            const adminUser =JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token:"";
        }
        const headerOption ={
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'authorization':token

            })
        }
        return this._http.delete(this.baseUrl+"/vendor/"+id,headerOption).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

}
