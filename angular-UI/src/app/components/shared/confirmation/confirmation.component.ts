import {ConfirmationService} from './confirmation.service';
import {Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {Confirmation} from './confirmation';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public confirmObj: Confirmation;
  public showConfirmationDialog = false;

  constructor(private confirmationService: ConfirmationService,
              private _elementRef: ElementRef,
              private renderer: Renderer) {
  }

  ngOnInit() {
    this.confirmationService.initiateConfirmation().subscribe((data: Confirmation) => {
      if (data.message) {
        this.confirmObj = data;
        this.showConfirmationDialog = true;
        this.renderer.setElementClass(this._elementRef.nativeElement.parentElement.children[0], 'blur-div', true);
      }
    });
  }

  confirm() {
    this.showConfirmationDialog = false;
    this.confirmationService.dialogConfirmation();
    this.renderer.setElementClass(this._elementRef.nativeElement.parentElement.children[0], 'blur-div', false);
  }

  reject() {
    setTimeout(() => {
      this.showConfirmationDialog = false;
      this.confirmationService.dialogRejection();
      this.renderer.setElementClass(this._elementRef.nativeElement.parentElement.children[0], 'blur-div', false);
    }, 200);

  }

}
