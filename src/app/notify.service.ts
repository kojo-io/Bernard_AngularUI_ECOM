import { Injectable } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private notification: NzNotificationService,
    private message: NzMessageService
  ) { }

  createNotification(type: string, title: string, message: string, placement?): any {
    return this.notification.create(type, title, message, {nzPlacement: placement});
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
