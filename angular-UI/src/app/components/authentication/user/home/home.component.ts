import { AuthenticationService } from '../../authentication.service';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../../../../../environments/environment';
import { Carousel } from 'angular-ui-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
  ) { }
  APIUrl = environment.cloudUrl + 'uploads/';

  ngOnInit() {
    
  }
  ngOnDestroy() {
  }

}


