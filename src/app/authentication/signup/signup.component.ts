import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  isPasswordMatched: boolean = false;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}
  isChecked = false;
  check() {
    this.isChecked = !this.isChecked;
  }
  checkPasswords() {
    return (this.isPasswordMatched = this.password === this.confirmPassword);
  }

  register() {
    let timerInterval: any;
    Swal.fire({
      title: 'Registration Successful',
      html: 'You will be redirected to the login page in <b></b> seconds.',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');
        if (b) {
          timerInterval = setInterval(() => {
            const timeLeft = Swal.getTimerLeft();
            b.textContent = timeLeft ? Math.floor(timeLeft / 1000).toString() : '';
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/login']);
      }
    });
  }

}
