    
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  constructor(private _http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getPlaces(key) {
    return this._http.get("https://www.swiggy.com/dapi/misc/places-autocomplete?input=" + key + "&types=")
      .pipe(
        map(this.extractData));
  }
  getData(url) {
    return this._http.get(url)
      .pipe(
        map(this.extractData));
  }
  getData1(url, param) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("item_id", encodeURIComponent(param));
    return this._http.get(url, { params: {
      "item_id": param
    } }).pipe(
      map(this.extractData));
  }

}