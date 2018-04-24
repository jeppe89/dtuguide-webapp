import { AuthService } from './../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  constructor(public jwtHelper: JwtHelperService, private auth: AuthService) { }

  public isAdmin() {
    this.jwtHelper.decodeToken('123');
  }
}
