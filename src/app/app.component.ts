import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SkyCart';
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor(private authService: AuthService) {
    if (particlesJS) {
      particlesJS.load('particles-js', '../assets/particles/particles.json', null);
    }
  }
}
