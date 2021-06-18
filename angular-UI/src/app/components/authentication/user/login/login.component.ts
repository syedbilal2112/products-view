import { AuthenticationService } from '../../authentication.service';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../shared/notification/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { HomeService } from '../../../dashboard/home/home.service';
import * as AppUtils from '../../../../utils/app.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private httpAuthenticateSubscription: Subscription;
  loginForm: FormGroup;
  showPassword = false;
  @ViewChild('password') password: ElementRef;

  constructor(

    private titleService: Title,
    private _fb: FormBuilder,
    private authService: AuthenticationService,
    private homeService: HomeService,
    private router: Router,
    private notify: NotificationService
  ) { }

  ngOnInit() {
    var tokenData = JSON.parse(localStorage.getItem(AppUtils.STORAGE_CLOUD_TOKEN));
    var tokenUserData = JSON.parse(localStorage.getItem('tablet-user-details'));
    if (!tokenData) {
      this.titleService.setTitle('Login');
      this.loginForm = this._fb.group({
        email: ['', Validators.required],
        password: ['', [<any>Validators.required, Validators.minLength(5)]],
        ipAddress: ['']
      });
    } else {
      this.authService.storeUserData(tokenData.accessToken, tokenUserData);
      // PENDING handle role
      if (this.authService.isLoggedInUser()) {
        // console.log("logged In");
        this.router.navigate(['/dashboard/home']);
      }
    }
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
  }
  loginTo(userForm) {
    // console.log("Innn")
    var data = {};
    if (userForm.value.email && userForm.value.email != '') {
      data['email'] = userForm.value.email;
      if (userForm.value.password && userForm.value.password != '') {
        data['password'] = userForm.value.password;
      }
      else {
        this.notify.error('Please Enter Credentials', '');
        return;
      }
    }
    else {
      this.notify.error('Please Enter Credentials', '');
      return;
    }
    this.onLoginSubmit(data);
  }
  onLoginSubmit(userForm) {
    this.httpAuthenticateSubscription = this.authService.authenticateUser(userForm)
      .subscribe(data => {
        if (data) {
          this.authService.storeUserData(data.token , data.user);
          if (this.authService.isLoggedInUser()) {
            this.router.navigate(['/dashboard/home']);
          }
        };
      }, (error) => {
        let body;
        if (error._body) {
          body = JSON.parse(error._body);
        }
        if (body.status === 406) {
          this.notify.error('Unable to Login!!', body.message);
        } else {
          this.notify.error('Invalid Username or Password', error.statusText);
        }
      });
  }

  ngOnDestroy() {
    if (this.httpAuthenticateSubscription) {
      this.httpAuthenticateSubscription.unsubscribe();
    }
  }

}


