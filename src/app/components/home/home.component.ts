import { Component, OnInit } from '@angular/core';
import {faUserLock, faEye, faHandPointer} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Font awesome icons */
  faLock = faUserLock;
  faEye = faEye;
  faHandPointer = faHandPointer;

  /** Type writer index */
  i = 0;

  /** Type writer text */
  text = 'Ready to secure your passwords ?';

  constructor() { }

  /** Type writer */
  typeWriter() {
    if (this.i < this.text.length) {
      document.querySelector('.quotes').innerHTML = document.querySelector('.quotes').innerHTML.split('_').shift();
      document.querySelector('.quotes').innerHTML += this.text[this.i];
      document.querySelector('.quotes').innerHTML += '_';

      this.i++;
      if (this.i === this.text.length) {
        document.querySelector('.quotes').innerHTML = document.querySelector('.quotes').innerHTML.split('_').shift();
      }
      setTimeout(() => this.typeWriter(), 100);
    }
  }

  /** On init */
  ngOnInit(): void {
    this.typeWriter();
  }

}
