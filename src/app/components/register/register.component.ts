import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ElectronService} from "../../core/services";
import {UserService} from "../../shared/http/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /** Register form */
  registerForm = new FormGroup({});

  /** Submitted */
  submitted = false;

  /** Password error */
  passwordError = true;

  constructor(
    private toastr: ToastrService,
    private electronService: ElectronService,
    private user: UserService,
    private router: Router
  ) { }

  /** On init */
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    });
  }

  /** On submit */
  onSubmit(): void {
    this.submitted = true;
    if (
      this.registerForm.valid
      && this.passwordError
    ) {
      this.user.register(this.registerForm.value)
        .subscribe((result: any) => {
          this.electronService.generateKeys(result._id);
          this.toastr.success('Welcome on PassWorld !');
          this.router.navigateByUrl('/login');
        });
    } else {
      this.toastr.error(`Please fullfill all fields`, ``);
    }
  }

  checkPassword() {
    this.passwordError = this.registerForm.get('password').value === this.registerForm.get('repassword').value;
  }

}
