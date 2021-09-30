import {Component, OnChanges, OnInit} from '@angular/core';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faKey = faKey;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getStatus(): boolean {
    return localStorage.getItem('isOnline') === 'true';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('isOnline', 'false');
    this.router.navigateByUrl('/');
  }

}
