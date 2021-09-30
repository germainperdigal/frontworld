import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PasswordService} from '../http/password.service';

@Injectable()
export class PasswordsResolver implements Resolve<any> {
  constructor(private passwords: PasswordService) {}
  resolve(): Observable<any> {
    return this.passwords.get();
  }
}
