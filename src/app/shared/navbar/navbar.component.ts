import { ApiService } from 'src/app/services/api.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }
  isLoggedin: boolean = false
  itemCount: number = 0
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedin = true
    } else {
      this.isLoggedin = false
    }
    this.apiService.currentItemCount.subscribe((res: any) => {
      this.itemCount = res
    })
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
