import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class HomepageService extends Subject<any> {
  
  constructor(    private router: Router) {
    super();
  }


}