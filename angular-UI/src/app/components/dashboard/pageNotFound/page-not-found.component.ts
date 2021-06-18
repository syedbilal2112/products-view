import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('page-not-found');
  }

  home(){
    this.router.navigate(['dashboard/home/']);
  }

}
