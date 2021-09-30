import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ElectronService} from '../../../core/services';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PasswordService} from '../../../shared/http/password.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  /** Creation form */
  creationForm = new FormGroup({});
  /** Submitted */
  submitted = false;

  constructor(
    private toastr: ToastrService,
    private electronService: ElectronService,
    private password: PasswordService,
    private router: Router
  ) { }

  /** On init */
  ngOnInit(): void {
    this.creationForm = new FormGroup({
      username: new FormControl(''),
      website: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      encryption: new FormControl('')
    });
  }

  /** On submit */
  onSubmit(): void {
    this.submitted = true;
    if (
      this.creationForm.valid
    ) {
      const buffer = this.electronService.cryptPassword(this.creationForm.get('password').value);
      this.creationForm.get('encryption').setValue(buffer);
      this.password.add(this.creationForm.value)
        .subscribe((result: any) => {
          this.toastr.success('Successfully added !');
          this.router.navigateByUrl('/secured/passwords');
        });
    } else {
      this.toastr.error(`Please fullfill all fields`, ``);
    }
  }
}
