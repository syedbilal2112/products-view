import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../shared/notification/notification.service';
@Component({
  selector: 'app-subCategory',
  templateUrl: './subCategory.component.html',
  styleUrls: ['./subCategory.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router,
    private homeService: HomeService,
    private modalService: BsModalService,
    private notification: NotificationService) { }

  modalRef: BsModalRef;
  categories;
  filteredCategoryArray;
  formData = new FormGroup({
    id: new FormControl(),
    mainCategory: new FormControl(),
    subCategory: new FormControl()
  });
  headerData;
  category;
  actionText;
  ngOnInit() {
    this.getData()
  }

  getData() {
    this.homeService.getData('category')
      .subscribe(data => {
        this.categories = [...data.result];
        this.filteredCategoryArray = [...data.result];
      })
  }

  close() {
    this.modalRef.hide();
    this.formData.reset();
  }

  setData() {
    let data = JSON.parse(JSON.stringify(this.formData.value));
    if (this.actionText == 'Save Category') {
      if (data.mainCategory) {
        this.homeService.addData('category', data)
          .subscribe(data => {
            this.getData();
            this.modalRef.hide();
            this.notification.success('Sub Catergory Data Saved!!', 'Success');
          })
      } else {
        this.notification.warn('Select Main Category', '');
      }
    } else {
      if (data.mainCategory) {
        this.homeService.updateData('category', data)
          .subscribe(data => {
            this.getData();
            this.modalRef.hide();
            this.notification.success('Sub Catergory Data Updated!!', 'Success');
          })
      } else {
        this.notification.warn('Select Main Category', '');
      }
    }
  }

  addProduct(template) {
    this.headerData = "Add Category";
    this.actionText = "Save Category";
    this.formData.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static' })
  }

  editProduct(template, data) {
    this.headerData = "Edit " + data.subCategory;
    this.actionText = "Edit Category";
    this.formData.controls['subCategory'].setValue(data.subCategory);
    this.formData.controls['mainCategory'].setValue(data.mainCategory);
    this.formData.controls['id'].setValue(data.id);
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static' })
  }

  deleteProduct(id) {
    if (confirm("Are you sure you want to delete this sub category?")) {
      this.homeService.deleteData('category', id)
        .subscribe(data => {
          this.getData();
          this.notification.success('Sub Catergory Deleted!!', 'Success');
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
