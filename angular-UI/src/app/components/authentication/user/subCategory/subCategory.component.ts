import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as $ from 'jquery';
// import { MatCheckboxModule } from '@angular/Material';
// import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from '../../authentication.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-subCategory',
  templateUrl: './subCategory.component.html',
  styleUrls: ['./subCategory.component.scss']
})
export class SubCategoryComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  productDetails;
  APIUrl = environment.cloudUrl + 'uploads/';

  navigateToSingleProduct(id) {
    this.router.navigate(['/product/' + id]);
  }
  goToHome(){
    this.router.navigate(['/products']);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authService.getSubCategoryId(params['subCategory'])
      .subscribe(data => {
        this.productDetails = data.result;
      })
    })
  }

  ngOnDestroy() {

  }

}


