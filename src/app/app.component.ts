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
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }

  logout() {
    this.auth.logout();
  }

  checkToken(): void {
    this.auth.checkToken();
  }
}
