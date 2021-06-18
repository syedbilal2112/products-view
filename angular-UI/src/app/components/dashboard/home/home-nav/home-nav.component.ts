import { Component, OnInit, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss'],
  providers: [HomeService]
})
export class HomeNavComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {

  }

  navigationToSubCategory() {
    console.log("'dashboard/home' + '/subCategory'");
    
    this.router.navigate(['dashboard/home' + '/subCategory']);
  }
}
