import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit() {
    
  }

}
