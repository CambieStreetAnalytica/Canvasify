import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BaseRequestsService {
    public options: HttpHeaders;
    private _baseURL: string = "http://localhost:8000/api/";
    constructor(private http: HttpClient) {
        this.options = new HttpHeaders()
            .set('Content-Type', 'application/json');
    }

    public get<T>(url: string): Observable<T> {
        return this.http.get<string>(this._baseURL + "?endpoint=" +  url, {headers: this.options}).pipe(
            map(value => <T>JSON.parse(value))
        );
    }


}