import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private service: AuthService) {
      this.form = fb.group({
        username: [''],
        password: ['']
      });
  }

  login(): void {
    const credentials = this.form.value;
    this.service.auth(credentials.username, credentials.password);
  }

}
