import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit, OnChanges {

  /** Password */
  @Input()
  password = '';

  /** Password strength */
  passwordStrength = 0;

  constructor(
  ) { }

  /** Valid */
  valid = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.determineStrength(changes.password.currentValue);
  }

  determineStrength(password: string) {
    const valid = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    this.valid = valid.test(password);
  }

}
