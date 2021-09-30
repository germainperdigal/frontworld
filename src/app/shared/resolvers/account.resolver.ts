import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../http/user.service';

@Injectable()
export class AccountResolver implements Resolve<any> {
  constructor(private user: UserService) {}
  resolve(): Observable<any> {
    return this.user.getUser();
  }
}
