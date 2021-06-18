import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Confirmation} from './confirmation';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConfirmationService {
  public confirm: BehaviorSubject<Confirmation> = <BehaviorSubject<Confirmation>> new BehaviorSubject({});
  public dialogConfirmation: () => void;
  public dialogRejection: () => void;

  constructor() {
  }

  initiateConfirmation(): Observable<Confirmation> {
    return this.confirm.asObservable();
  }

  showDialog(subject: string, message: string) {
    console.log("aaaaaaaaaaaaaa");
    
    this.confirm.next(<Confirmation>{subject: subject, message: message});
    return new Observable((obj) => {
      this.dialogConfirmation = () => obj.next(true);
      this.dialogRejection = () => obj.next(false);
    });

  }

}
