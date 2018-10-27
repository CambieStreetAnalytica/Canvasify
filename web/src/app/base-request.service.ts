import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

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
        return this.http.get<T>(this._baseURL + url, {headers: this.options});
    }


}