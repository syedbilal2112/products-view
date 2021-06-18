import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthenticationService } from '../components/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authenticationService.loggedIn()) {
      return true;
   }else {
      this.router.navigate(['/']);
      return false;
   }
  }
}
