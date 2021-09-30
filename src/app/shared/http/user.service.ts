import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Base api */
  baseApi = 'http://86.248.60.238:2323/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Register
   *
   * @param formData The form data
   */
  register(formData: FormData): Observable<any> {
    return this.http.post(this.baseApi+'user/register', formData);
  }

  /**
   * Login
   *
   * @param formData The form data
   */
  login(formData: FormData): Observable<any> {
    return this.http.post(this.baseApi+'user/login', formData);
  }

  /** Get user */
  getUser(): Observable<any> {
    return this.http.get(this.baseApi+'user', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: localStorage.getItem('token')
      }
    });
  }

  /**
   * Check integrity
   *
   * @param token The token to check
   */
  checkIntegrity(token: string): Promise<any> {
    const that = this;
    token = !token ? String(new Date()) : token;

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    });
    const options = { headers };
    const postData = { token };
    return new Promise(function(resolve) {
      that.http.post(that.baseApi + 'token/', postData, options).subscribe(function(data: any) {
        resolve(data);

        if (data === false) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('isOnline', String(data));
      }, function(err) {
        localStorage.removeItem('token');
        resolve(err);
      });
    });
  }
}
