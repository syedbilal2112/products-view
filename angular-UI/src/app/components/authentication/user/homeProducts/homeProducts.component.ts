import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-homeProducts',
  templateUrl: './homeProducts.component.html',
  styleUrls: ['./homeProducts.component.scss']
})
export class HomeProductsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  isAuto = false;
  isElec = false;
  isAll = true
  checBxFlag = false;

  productArray = [];
  selectedProductArray = [];
  filteredProductArray = [];
  title = 'materialApp';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  isAllChecked = true;
  maxProducts = 20;
  APIUrl = environment.cloudUrl + 'uploads/';
  automation() {
    this.isAuto = true;
    this.isElec = false;
    this.isAll = false;
    this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
    this.selectedProductArray = this.selectedProductArray.filter(x => {
      return x.mainCategory == "Automation";
    })
    this.filteredProductArray = this.productArray.filter(x => {
      return x.mainCategory == "Automation";
    })
  }
  electrodevices() {
    this.isAuto = false;
    this.isElec = true;
    this.isAll = false;
    this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
    this.selectedProductArray = this.selectedProductArray.filter(x => {
      return x.mainCategory == "Electrodevices";
    })
    this.filteredProductArray = this.productArray.filter(x => {
      return x.mainCategory == "Electrodevices";
    })
  }
  allProducts() {
    this.isAuto = false;
    this.isElec = false;
    this.isAll = true;
    this.selectedProductArray = [...this.productArray];
    this.filteredProductArray = [...this.productArray];
    this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
  }

  navigateToSingleProduct(id) {
    this.router.navigate(['/product/' + id]);
  }

  getSelectedproducts(data) {    
    let tempProducts = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].checked)
        tempProducts.push(data[index])
    }
    tempProducts = tempProducts.splice(0, this.maxProducts)
    return tempProducts;
  }

  loadMoreProducts() {
    this.maxProducts += 20;
  }

  filterProducts(data) {
    this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
    this.selectedProductArray = this.selectedProductArray.filter(x => {
      let a = x.subCategory.toUpperCase();
      return a.includes(data.toUpperCase());
    })

    this.filteredProductArray = this.filteredProductArray.filter(x => {
      let a = x.subCategory.toUpperCase();
      return a.includes(data.toUpperCase());
    })
  }
  subCategory = [];
  setCheckedProducts(i, subCategory, value) {
    if (value)
      this.subCategory.push(subCategory);
    else {
      this.subCategory = _.remove(this.subCategory, function (n) {
        return n != subCategory
      });
    }
    this.selectedProductArray = JSON.parse(JSON.stringify(this.selectedProductArray))
    this.selectedProductArray[i].checked = value;

    let tempArr = JSON.parse(JSON.stringify(this.subCategory));
    this.filteredProductArray = this.productArray.filter(x => {
      return tempArr.includes(x.subCategory);
    })
    if (value) {
      for (let index = 0; index < this.filteredProductArray.length; index++) {
        this.filteredProductArray[index].checked = value;
      }
    }
  }

  setAllCheckedProducts(value) {
    for (let index = 0; index < this.selectedProductArray.length; index++) {
      this.selectedProductArray[index]['checked'] = value;
    }
    this.filteredProductArray = [...this.productArray ];
    for (let index = 0; index < this.filteredProductArray.length; index++) {
      this.filteredProductArray[index]['checked'] = value;
    }    
    this.isAllChecked = value;
  }

  ngOnInit() {
    this.authService.getProducts()
      .subscribe(data => {
        this.productArray = _.sortBy(data.result, [function (o) { return o.productName; }]);
        
        this.selectedProductArray = _.uniqBy(this.productArray, 'subCategory');
        
        this.filteredProductArray = [...this.productArray];
        //Producto a favoritos
        $('.card .aFavs').click(function () {
          $(this).parents('.card').toggleClass('esFav');
        })
        //Producto al carrito
        $('.card .alCarrito').click(function () {
          $(this).parents('.card').toggleClass('enCarrito');
        })

      })
  }

  ngOnDestroy() {

  }

}


