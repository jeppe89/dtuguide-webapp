import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  public notificationSubject = new BehaviorSubject<string>(null);

  public notification$ = this.notificationSubject.asObservable();

  constructor() { }
}
