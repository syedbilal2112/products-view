export class Notification {
  type: NotificationType;
  subject: string;
  message: string;
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}
