import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notification, NotificationType} from './notification';
import {NotificationService} from './notification.service';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: Notification[];
  public closingSection: Notification;
  private notificationTimeout;
  private timer;
  private httpGetAlert: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationTimeout = notificationService.notificationTimeout;
  }

  ngOnInit() {
    this.notificationService.getAlert().subscribe((notification: Notification) => {
      if (!notification) {
        this.notifications = [];
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        return;
      }

      this.notifications.push(notification);
      this.autoRemoveNotification();
    });
  }

  removeAlert(notification: Notification) {
    this.closingSection = notification;
    setTimeout(() => {
      this.notifications = this.notifications.filter(x => x !== notification);
    }, 400);
  }

  autoRemoveNotification() {
    if (isNullOrUndefined(this.timer)) {
      this.timer = setInterval(() => {
        if (this.notifications.length === 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.removeAlert(this.notifications[0]);
      }, this.notificationTimeout);
    }
  }


  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case NotificationType.Success:
        return 'success animation';
      case NotificationType.Error:
        return 'error animation';
      case NotificationType.Info:
        return 'info animation';
      case NotificationType.Warning:
        return 'warning animation';
    }
  }

  cssClassClosing(notification: Notification) {
    if (this.closingSection === notification) {
      return 'close-animation';
    }
  }

  ngOnDestroy(): void {
    this.httpGetAlert.unsubscribe();
  }

}
