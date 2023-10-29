import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  email: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  exampleSubscription() {
    Swal.fire({
      icon: 'success',
      title: 'Good news!',
      confirmButtonColor: '#1c5c69',
      html: `You have subscribed to the newsletter with the email: ${this.email}`
    });

  }
}
