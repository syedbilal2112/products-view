import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { AuthenticationService } from '../../authentication.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router,
    private authService: AuthenticationService) { }

  APIUrl = environment.cloudUrl + 'uploads/';
  isAuto = true;
  isElec = false;

  productArray = [];
  selectedProductArray = [];
  filteredProductArray = [];
  mainNav;
  productNav = {};
  goToProduct(data) {
    this.router.navigate(['/product/' + data.id]);
  }
  goToCategory(data) {
    this.router.navigate(['/subCategory/' + data.subCategory]);
  }
  // ulAutomation() {
  //   this.isAuto = true;
  //   this.isElec = false;
  //   this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
  //   this.selectedProductArray = this.selectedProductArray.filter(x => {
  //     return x.mainCategory == "Automation";
  //   });
  // }
  // ulElectrodevices() {
  //   this.isAuto = false;
  //   this.isElec = true;
  //   this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
  //   this.selectedProductArray = this.selectedProductArray.filter(x => {
  //     return x.mainCategory == "Electrodevices";
  //   });
  // }

  callSubProducts(event, product) {
    this.filteredProductArray = this.productArray.filter(x => {
      return x.subCategory == product.subCategory
    });
    this.filteredProductArray = this.filteredProductArray.splice(0, 3);

    Object.keys(this.productNav).map((x, i) => {
      this.productNav[x] = false;
    })
    this.productNav[product.id] = true;
  }

  headerToggle() {
    this.mainNav = !this.mainNav;

  }
  ngOnInit() {
    this.authService.getProducts()
      .subscribe(data => {
        this.productArray = _.sortBy(data.result, [function (o) { return o.productName; }]);
        this.filteredProductArray = this.productArray.splice(0, 3);
      })
    this.authService.getSubCategory()
      .subscribe(data => {
        this.selectedProductArray = [...data.result];
      })
    $(document).ready(function ($) {
      document.body.addEventListener('click', function (e) {
        if (e.target['localName'] != 'button') {
          $('.cd-dropdown').toggleClass('dropdown-is-active', false);
          $('.cd-dropdown-trigger').toggleClass('dropdown-is-active', false);
          $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $('.has-children ul').addClass('is-hidden');
            $('.move-out').removeClass('move-out');
            $('.is-active').removeClass('is-active');
          });
        }
      }, { passive: false });
    })
  }
}
