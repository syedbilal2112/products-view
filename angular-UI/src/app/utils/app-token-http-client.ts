import {Injectable} from '@angular/core';
import {Http, Response, RequestOptionsArgs, Headers, RequestOptions, ConnectionBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SecurityToken} from '../security/securityToken';
import * as AppUtils from './app.utils';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';
import {Router} from '@angular/router';

import * as CryptoJS from 'crypto-js';
import {environment} from '../../environments/environment';
import { AuthenticationService } from '../components/authentication/authentication.service';
import { isNullOrUndefined } from 'util';

// declare var CryptoJS;

@Injectable()
export class HmacHttpClient extends Http {
  http: Http;
  router: Router;

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }

  addSecurityHeader(url: string, method: string, options: RequestOptionsArgs, body: any): RequestOptionsArgs {
    if (AppUtils.UrlMatcher.matches(url)) {
      // const securityToken: SecurityToken = new SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
      const date: string = new Date().toISOString();
      // const secret: string = securityToken.val1;
      url = url.replace(environment.cloudUrl, '');
      url = url.substring(url.indexOf('/', 2));
      const message = method + url + date;
      // options.headers.set(AppUtils.CSRF_CLAIM_HEADER, securityToken.val4);
      options.headers.set('Accept', 'application/json');
      const token = localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
      if (!isNullOrUndefined(token)) {
        options.headers.set('Authorization', token);
      }
//      if (securityToken.isEncoding('iPCMB')) {
//         options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA256(message, secret).toString());
//       }
//       options.headers.set(AppUtils.HEADER_X_ONCE, date);
//       options.headers.set(AppUtils.JWT_APP_TOKEN, securityToken.val3);
      return options;
    } else {
      return options;
    }

  }

  setOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = new Headers();
    }
    return options;
  }

  mapResponse(res: Response, observer: Observer<Response>): void {
    if (res.ok && res.headers) {
      const securityToken: SecurityToken = new SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
      if (securityToken) {
        // localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN, JSON.stringify(securityToken));
      }
    }
    observer.next(res);
    observer.complete();
  }

  catchResponse(res: Response, observer: Observer<Response>): void {
    try {
      // jwt token expired or invalid
        if ((res.status === 401 || res.status === 403)) {
          // if user is logged in , logout the user for re - login
          this.clearStorage();
          // window.location.href = window.location.origin;
      }
        const exceptionMsg = JSON.parse(res.text()).Exception;
        console.error('Exception :', exceptionMsg);

    } catch (e) {
      console.error(e);
    } finally {
      // this.accountEventsService.logout({});
      // localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
      // localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);
      observer.error(res);
      observer.complete();
    }
  }

  clearStorage() {
    localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
    localStorage.removeItem(AppUtils.STORAGE_USER_DETAILS);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    options = this.addSecurityHeader(url, 'GET', options, null);

    return Observable.create((observer: Observer<Response>) => {
      super.get(url, options)
        .subscribe((res: Response) => {
          this.mapResponse(res, observer);
        }, (res: Response) => {
          this.catchResponse(res, observer);
        });
    });
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    options = this.addSecurityHeader(url, 'POST', options, body);

    return Observable.create((observer: Observer<Response>) => {
      super.post(url, body, options)
        .subscribe((res: Response) => {
          this.mapResponse(res, observer);
        }, (res: Response) => {
          this.catchResponse(res, observer);
        });
    });
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    options = this.addSecurityHeader(url, 'PUT', options, body);

    return Observable.create((observer: Observer<Response>) => {
      super.put(url, body, options)
        .subscribe((res: Response) => {
          this.mapResponse(res, observer);
        }, (res: Response) => {
          this.catchResponse(res, observer);
        });
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    options = this.addSecurityHeader(url, 'DELETE', options, null);

    return Observable.create((observer: Observer<Response>) => {
      super.delete(url, options)
        .subscribe((res: Response) => {
          this.mapResponse(res, observer);
        }, (res: Response) => {
          this.catchResponse(res, observer);
        });
    });
  }
}
