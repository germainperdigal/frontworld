import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/http/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({});
  submitted = false;

  constructor(
    private user: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.loginForm.valid) {
      this.user.login(this.loginForm.getRawValue())
        .subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentId', res.id);
          this.toastr.success(res.message);
          this.router.navigateByUrl('/secured/passwords');
          },
          (err) => {
            this.toastr.error(err.error.message);
          });
    }
  }

}
