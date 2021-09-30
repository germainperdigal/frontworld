import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/http/user.service";
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  /** Register form */
  registerForm = new FormGroup({});

  /** Loading */
  loading = true;

  /** Current user */
  currentUser = null;

  /** Fa user icon */
  faUser = faUser;

  constructor(
    private user: UserService
  ) {
  }

  /** On init */
  ngOnInit(): void {
    this.user.getUser()
      .subscribe((result: any) => {
        this.currentUser = result;
        this.registerForm = new FormGroup({
          username: new FormControl(result.username, [Validators.required]),
          email: new FormControl(result.email, [Validators.required]),
          password: new FormControl('', [Validators.required]),
          repassword: new FormControl('', [Validators.required])
        });
        this.loading = false;
      });
  }

}
