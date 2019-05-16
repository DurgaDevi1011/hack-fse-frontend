import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const localVendorstorage = JSON.parse(localStorage.getItem('vendor'));

@Injectable()
export class ItemService {
    constructor(private http: HttpClient, private myglobals: Globals) { }

    apiUrl = "items";
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

    createItem(data): Observable<any> {
        var additem = 'additem';
        data["belongs_To"] = localVendorstorage.vendor_id;
        console.log(data);
        return this.http.post(`${this.baseUrl}${this.apiUrl}/${additem}`, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    /* getVendors(): Observable<any> {
      return this.http.get(`${baseUrl}/${apiUrl}`, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    } */

    getItemsBelongsToVendor(): Observable<any> {
        console.log(localVendorstorage.vendor_id);
        var getitems = 'getitems';
        const url = `${this.baseUrl}${this.apiUrl}/${getitems}/${localVendorstorage['vendor_id']}`;
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getItemBelongsToVendor(id): Observable<any> {
        const url = `${this.baseUrl}${this.apiUrl}//${localVendorstorage['vendor_id']}/${id}`;
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getItem(itemno: string): Observable<any> {
        const url = `${this.baseUrl}${this.apiUrl}/${itemno}`;
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    updateItem(id, data): Observable<any> {
        return this.http.put(`${this.baseUrl}${this.apiUrl}/${localVendorstorage['vendor_id']}/${id}`, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteItem(id: string): Observable<{}> {
        var deleteitem = 'deleteitem';
        return this.http.put(`${this.baseUrl}${this.apiUrl}/${deleteitem}/${localVendorstorage['vendor_id']}/${id}`, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}