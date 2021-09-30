import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  /** Base api */
  baseApi = 'http://86.248.60.238:2323/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Add
   *
   * @param formData The form data
   */
  add(formData: FormData) {
    return this.http.post(this.baseApi+'password', formData, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: localStorage.getItem('token')
      }
    });
  }

  /**
   * Update
   *
   * @param id The password id to update
   * @param encryption The password encrypted buffer
   */
  update(id: string, encryption: Buffer) {
    return this.http.patch(this.baseApi+'password/'+id, {encryption}, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: localStorage.getItem('token')
      }
    });
  }

  /** Get */
  get() {
    return this.http.get(this.baseApi+'password', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: localStorage.getItem('token')
      }
    });
  }

  /**
   * Delete
   *
   * @param id The password id
   */
  delete(id: string) {
    return this.http.delete(this.baseApi+'password/'+id, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: localStorage.getItem('token')
      }
    });
  }
}
