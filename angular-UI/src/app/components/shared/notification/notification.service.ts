import {Injectable} from '@angular/core';
import {Notification, NotificationType} from './notification';
import {Subject} from 'rxjs/Subject';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  notificationTimeout = 3000; // 5000 miliSecond default
  private subject = new Subject<Notification>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  setNotificationTimeOut(time: number) {
    this.notificationTimeout = time;
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(subject: string, message: string, keepAfterRouteChange = false) {
    this.setNotification(NotificationType.Success, subject, message, keepAfterRouteChange);
  }

  error(subject: string, message: string, keepAfterRouteChange = false) {
    this.setNotification(NotificationType.Error, subject, message, keepAfterRouteChange);
  }

  info(subject: string, message: string, keepAfterRouteChange = false) {
    this.setNotification(NotificationType.Info, subject, message, keepAfterRouteChange);
  }

  warn(subject: string, message: string, keepAfterRouteChange = false) {
    this.setNotification(NotificationType.Warning, subject, message, keepAfterRouteChange);
  }

  private setNotification(type: NotificationType, subject: string, message: string, keepAfterRouteChange = false) {
    this.clear();
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Notification>{type: type, subject: subject, message: message});
  }

  clear() {
    this.subject.next();
  }


}
