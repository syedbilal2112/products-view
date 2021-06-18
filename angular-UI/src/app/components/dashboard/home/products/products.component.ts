import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../shared/notification/notification.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router,
    private homeService: HomeService,
    private modalService: BsModalService,
    private notification: NotificationService) { }

  APIUrl = environment.cloudUrl + 'uploads/';

  modalRef: BsModalRef;
  categories;
  filteredCategoryArray;
  formData = new FormGroup({
    id: new FormControl(),
    mainCategory: new FormControl(),
    subCategory: new FormControl(),
    productImage: new FormControl(),
    productName: new FormControl(),
    productDescription: new FormControl()
  });
  picFile;
  selectCategory

  headerData;
  category;
  actionText;
  fileName;
  ngOnInit() {
    this.getData();
    this.getCategory()
  }

  getCategory(){
    this.homeService.getData('category')
      .subscribe(data => {
        this.selectCategory = [...data.result];
        console.log(this.selectCategory);
        
      })
  }

  getData() {
    this.homeService.getData('getAllProduct')
      .subscribe(data => {
        this.categories = [...data.result];
        this.filteredCategoryArray = [...data.result];
      })
  }

  handleFileInput(file) {
    this.picFile = file[0];
    this.fileName = this.picFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      this.picFile = reader.result;
    };
  }

  close() {
    this.modalRef.hide();
    this.formData.reset();
  }

  setData() {
    let data = JSON.parse(JSON.stringify(this.formData.value));
    if (this.actionText == 'Save Product') {
      if (data.mainCategory && this.fileName) {
        data['file'] = this.picFile;
        data['fileName'] = this.fileName;
        this.homeService.addData('product', data)
          .subscribe(data => {
            this.getData();
            this.modalRef.hide();
            this.notification.success('Product Data Saved!!', 'Success');
          })
      } else {
        this.notification.warn('Enter All Fields', '');
      }
    } else {
      if (data.mainCategory && this.fileName) {
        data['file'] = this.picFile;
        data['productImage'] = this.fileName;
        this.homeService.updateData('product', data)
          .subscribe(data => {
            this.getData();
            this.modalRef.hide();
            this.notification.success('Product Data Updated!!', 'Success');
          })
      } else {
        this.notification.warn('Enter All Fields', '');
      }
    }
  }

  addProduct(template) {
    this.headerData = "Add Product";
    this.actionText = "Save Product";
    this.formData.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static' })
  }

  editProduct(template, data) {
    this.formData.reset();
    this.headerData = "Edit " + data.productName;
    this.actionText = "Edit Product";
    this.formData.controls['subCategory'].setValue(data.subCategory);
    this.formData.controls['mainCategory'].setValue(data.mainCategory);
    this.formData.controls['productName'].setValue(data.productName);
    this.formData.controls['productDescription'].setValue(data.productDescription);
    // this.formData.controls['productImage'].setValue(data.productImage);
    this.formData.controls['id'].setValue(data.id);
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static' })
  }

  deleteProduct(id) {
    if (confirm("Are you sure you want to delete this Product?")) {
      this.homeService.deleteData('product', id)
        .subscribe(data => {
          this.getData();
          this.notification.success('Product Deleted!!', 'Success');
        })
    }
  }

  filterProducts(data) {
    this.filteredCategoryArray = this.categories.filter(x => {
      let a = (x.subCategory ? x.subCategory.toUpperCase() : '');
      let b = (x.mainCategory ? x.mainCategory.toUpperCase() : '');
      return a.includes(data.toUpperCase()) || b.includes(data.toUpperCase());
    })
  }

  getSelectedproducts(data) {
    return data;
  }

}
