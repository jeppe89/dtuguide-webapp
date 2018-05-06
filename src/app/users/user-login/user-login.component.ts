import { Router } from '@angular/router';
import { LocationService } from './../../locations/shared/location.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private auth: AuthService, private router: Router) {
      this.form = fb.group({
        username: ['s144265'],
        password: ['123456']
      });
  }

  ngOnInit() {
    this.redirectIfAuthenticated();
  }

  redirectIfAuthenticated() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  login(): void {
    this.auth.login(this.form.value);
      /*
     this.location.addLocation(formVal).subscribe(data => console.log(data), // success path
     error => console.log(error) // error path);
     */
  }
}
