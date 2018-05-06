import { NotificationService } from './utils/notification.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DTU Guide';
  showTopBar$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private notification: NotificationService) { }

  ngOnInit() {
    this.showTopBar$ = this.auth.showTopBarIfAuth;
    this.showNotificationSnackBar();
  }

  showNotificationSnackBar() {
    this.notification.notification$.subscribe(message => {
      if (message !== null) {
        this.snackBar.open(message, null, {
          duration: 3000
        });
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  checkToken(): void {
    this.auth.checkToken();
  }
}
