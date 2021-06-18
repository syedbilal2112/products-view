import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as AppUtils from '../../../app/utils/app.utils';
import { Auth } from '../../models/auth';
import { AbstractControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import * as Constant from '../../constants/app.constants';
import { isNullOrUndefined } from 'util';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthenticationService extends Subject<any> {
  authUser: Auth;
  public userRoles: Subject<any> = new Subject<any>();
  isNavBarCollapsed = new Subject<Boolean>();
  constructor(private http: Http,
    private router: Router) {
    super();
  }

  authenticateUser(user) {
    // return this.http.post(environment.url + Constant.LOGIN_URL, user)
    // .map(res => res.json());
    return this.http.post(environment.cloudUrl + Constant.LOGIN_URL, user)
      .pipe(
        map(res => res.json()) // or any other operator
      )
    // .subscribe(res => console.log(res));
  }

  storeUserData(token, user) {
    this.authUser = new Auth();
    this.authUser = user;
    localStorage.setItem(AppUtils.STORAGE_CLOUD_TOKEN, JSON.stringify({ accessToken: token }));
    
    localStorage.setItem(AppUtils.STORAGE_USER_DETAILS, JSON.stringify(this.authUser));
    this.loginSuccess(this.authUser);
  }

  loginSuccess(auth: Auth) {
    this.authUser = auth;
    if (auth) {
      auth.authenticated = true;
      super.next(auth);
    }
  }

  loggedIn(): boolean {
    const token = localStorage.getItem(AppUtils.STORAGE_CLOUD_TOKEN);
    return tokenNotExpired(AppUtils.STORAGE_CLOUD_TOKEN, token);
  }

  getProducts() {
    return this.http.get(environment.cloudUrl + 'product')
    .pipe(
      map(res => res.json()) // or any other operator
    )
  }

  getProductsId(id) {
    return this.http.get(environment.cloudUrl + 'product/' + id)
    .pipe(
      map(res => res.json()) // or any other operator
    )
  }
  
  getSubCategoryId(id) {
    return this.http.get(environment.cloudUrl + 'category/' + id)
    .pipe(
      map(res => res.json()) // or any other operator
    )
  }

  getSubCategory() {
    return this.http.get(environment.cloudUrl + 'categoryByCat')
    .pipe(
      map(res => res.json()) // or any other operator
    )
  }
  getAuthDeatils(): Auth {
    this.authUser = (this.authUser) ? this.authUser : new Auth(JSON.parse(localStorage.getItem(AppUtils.STORAGE_USER_DETAILS)));
    return this.authUser;
  }

  isLoggedInUser() {
    const user = this.getAuthDeatils();
    console.log("user",user);
    
    if (user) { // college login
      return true;
    } else {
      return false;
    }
  }

}