import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseRequestsService {
    public options: HttpHeaders;
    //REMOVE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    private _token: string = '11224~ErzGQ1qQ089CRPKMNPf2AEbWs3znatNQeisks2Hnl814zhTg3beMc0faxHo7FG6u'

    constructor(private http: HttpClient) {
        this.options = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'token' + this._token);
    }

    public get(url: string): void {
         this.http.get(url, {headers: this.options}).subscribe(
            (value: any) => {
                console.log(value);
            }
        );
    }


}
