import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as $ from 'jquery';
// import { MatCheckboxModule } from '@angular/Material';
// import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from '../../authentication.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-singleProduct',
  templateUrl: './singleProduct.component.html',
  styleUrls: ['./singleProduct.component.scss']
})
export class SingleProductComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  productDetails;
  APIUrl = environment.cloudUrl + 'uploads/';
  image;

  goToCategory(category){
    this.router.navigate(['/subCategory/' + category]);
  }
  goToHome(){
    this.router.navigate(['/products']);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authService.getProductsId(params['productId'])
      .subscribe(data => {
        this.productDetails = data.result[0];
        console.log("this.productDetails",this.productDetails);
        this.image = this.APIUrl + this.productDetails.productImage;
      })
    })
  }

  ngOnDestroy() {

  }

}


