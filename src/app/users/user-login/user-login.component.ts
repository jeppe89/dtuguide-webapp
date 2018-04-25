import { LocationService } from './../../locations/shared/location.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  form: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private auth: AuthService, private location: LocationService) {
      this.form = fb.group({
        username: ['s144265'],
        password: ['123456']
      });
  }

  login(): void {
    const formVal = this.form.value;
    this.auth.authenticate(formVal.username, formVal.password);
      /*
     this.location.addLocation(formVal).subscribe(data => console.log(data), // success path
     error => console.log(error) // error path);
     */
  }

}
