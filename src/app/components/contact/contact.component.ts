import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(''),
    message: new FormControl('', [Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }
  exampleContactSent() {
    Swal.fire({
      icon: 'success',
      title: 'Good news!',
      confirmButtonColor: '#1c5c69',
      html: '<p>Your message has been sent successfully.</p>'
    });

  }
}
