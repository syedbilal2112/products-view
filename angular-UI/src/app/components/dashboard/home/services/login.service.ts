import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/Rx';


@Injectable()
export class LoginService {

    aurl = environment.cloudUrl + 'login';


    constructor(private http: Http) { }

    login(data) {
        var data: any = {
            'name': data.name,
            'password': data.password
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.aurl, data, options)
            .map((res: Response) => res.json());
    }
}