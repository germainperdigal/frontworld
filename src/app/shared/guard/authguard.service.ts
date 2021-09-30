import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from '../http/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(public router: Router, private api: UserService) { }

  async canActivate(): Promise<any> {
    let returned = false;
    if (!Boolean(await this.isValid())) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      if (!returned) {
        returned = true;
        return Boolean(await this.isValid());
      }
    }
  }

  async isValid(): Promise<any> {
    return this.api.checkIntegrity(localStorage.getItem('token') || new Date().toString());
  }

  isAuth() {
    return false;
  }
}
