import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {faEye, faTimes, faEyeSlash, faCopy, faSave, faPen} from '@fortawesome/free-solid-svg-icons';
import {PasswordService} from '../../../shared/http/password.service';
import {ElectronService} from '../../../core/services';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from "@angular/router";
import {finalize, mergeMap} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /** Font awesome icons */
  faEye = faEye;
  faSave = faSave;
  faPen = faPen;
  faTimes = faTimes;
  faCopy = faCopy;
  faEyeSlash = faEyeSlash;

  /** Passwords */
  passwords: Array<any>;

  /** Edited row index */
  editedRow = null;

  /** Edition value */
  edition = null;

  constructor(
    private password: PasswordService,
    public electron: ElectronService,
    private changes: ChangeDetectorRef,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  /** On init */
  ngOnInit(): void {
    this.resolveData();
  }

  /** Resolve data */
  resolveData(): void {
    this.route.data
      .subscribe((data: { passwords }) => {
        this.passwords = data.passwords;
      });
  }

  /** Reset pass */
  resetPass(): void {
    this.passwords.forEach(password => {
      password.cleared = null;
    });
  }

  /**
   * Decrypt password
   *
   * @param encryption The stored encryption
   * @param index  The row index
   * @param copy   Copy to clipboard
   */
  decryptPassword(encryption: string, index: number, copy = false): void {
    this.electron.decryptPassword(encryption).then(res => {
      if(copy) {
        this.electron.copyToClipBoard(res, 'Password copied to clipboard !');
      } else {
        this.resetPass();
        this.passwords[index].cleared = res;
      }
    });
  }

  /**
   * Delete password
   *
   * @param password The password object
   */
  deletePassword(password: any): void {
    // eslint-disable-next-line no-underscore-dangle
    this.password.delete(password._id)
      .pipe((res: any) => {
        this.passwords.splice(this.passwords.indexOf(password), 1);

        return res;
      })
      .subscribe((result: any) => {
        this.toastr.success(result.message);
      });
  }

  /**
   * Edit row
   *
   * @param index The index
   */
  editRow(index: number) {
    this.editedRow = index;
  }

  /** Cancel editing */
  cancelEditing() {
    this.editedRow = null;
    this.edition = null;
  }

  /** Update password */
  updatePassword() {
    // eslint-disable-next-line no-underscore-dangle
    const passwordId = this.passwords[this.editedRow]._id;
    const encrypted = this.electron.cryptPassword(this.edition);
    console.log(this.passwords[this.editedRow]);
    this.password.update(passwordId, encrypted)
      .pipe(
        mergeMap(() => this.password.get())
      )
      .subscribe((newList: any) => {
        this.passwords = newList;
        this.cancelEditing();
      });
  }
}
