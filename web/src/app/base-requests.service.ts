import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseRequestsService {
    public options: HttpHeaders;
    constructor(private http: HttpClient) {
        this.options = new HttpHeaders()
            .set('Content-Type', 'application/json');
    }

    public get(url: string): void {
         this.http.get(url, {headers: this.options}).subscribe(
            (value: any) => {
                console.log(value);
            }
        );
    }


}
