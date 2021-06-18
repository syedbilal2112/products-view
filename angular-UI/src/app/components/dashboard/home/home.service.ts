import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable()
export class HomeService {
    constructor(private http: Http,
        private router: Router) {
    }

    headers = new Headers({ 'Content-Type': 'application/json' });

    options = new RequestOptions({ headers: this.headers });

    setHeaders() {
        let access = JSON.parse(localStorage.getItem('cloud-token'))['accessToken'];
        this.headers.set("accesstoken", access);
    }
    getData(endPoint) {
        this.setHeaders();
        var url = environment.cloudUrl + endPoint;
        return this.http.get(url, this.options)
            .pipe(map((res: Response) => res.json()))
    }

    addData(endPoint, data): Observable<number>  {
        this.setHeaders();
        var url = environment.cloudUrl + endPoint;
        return this.http.post(url, data, this.options)
            .pipe(map((res: Response) => res.json()))
    }

    updateData(endPoint, data) {
        this.setHeaders();
        var url = environment.cloudUrl + endPoint;
        return this.http.put(url, data, this.options)
            .pipe(map((res: Response) => res.json()))
    }

    deleteData(endPoint, id) {
        this.setHeaders();
        var url = environment.cloudUrl + endPoint;
        return this.http.delete(url + "/" + id)
            .pipe(map((res: Response) => res.json()))
    }

    getCategory() {
        this.setHeaders();
        var url = environment.cloudUrl + 'category';
        return this.http.get(url, this.options)
            .pipe(map((res: Response) => res.json()))
    }
    private handleError(error: Response | any) {
        return Observable.throw(error.status);
    }
}