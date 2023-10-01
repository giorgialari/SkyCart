import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  isLoggedin: boolean = false
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedin = true
    } else {
      this.isLoggedin = false
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
    this.isLoggedin = false
    this.router.navigate(['/products']);
  }
}
