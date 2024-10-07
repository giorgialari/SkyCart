import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cards: Card[] = [];
  subtotal: number = 0;
  shipping: number = 20;
  total: number = 0;
  constructor(private location: Location, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllCart();
  }
  goBack() {
    this.location.back();
  }
  getAllCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cards = cart;
    this.subtotal = this.cards.reduce(
      (acc, cur: any) => acc + cur.price * cur.quantity,
      0
    );

    this.total = this.subtotal + this.shipping;
  }

  deleteCart(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => {
      return +item.product_id !== +id;
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    this.getAllCart();
  }

  payment() {
    Swal.fire({
      icon: 'success',
      title: 'Good news!',
      confirmButtonColor: '#1c5c69',
      html: 'Payment successfully completed! <br> <b>Attention:</b> This is only an example, it has no real effect.',
    });
  }
}
