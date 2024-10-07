import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { PRODUCTS } from 'src/app/shared/data/data';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() productList: Product[] = [];
  productListFiltered: Product[] = [];
  isLoading = false;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCart();
  }

  getAllProducts() {
    this.isLoading = true;
    // this.apiService.get('products').subscribe((res: any) => {
      this.productList = PRODUCTS
      this.isLoading = false;
    // });
  }
  onFilterProducts(e: any) {
    this.isLoading = true;
    this.productListFiltered = e;
    setTimeout(() => {
      this.isLoading = false;
      this.productList = this.productListFiltered;
    }, 1000);
  }

  getAllCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.apiService.updateItemCount(cart.length);
  }

  onAddToCart(e: any) {
    if (localStorage.getItem('token')) {
      const product = {
        user_id: localStorage.getItem('user_id'),
        product_id: e.id,
        quantity: 1,
        title: e.title,
        price: e.price,
        image: e.image,
        category: e.category,
      };

      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const existingProductIndex = cart.findIndex((item: any) => item.product_id === e.id);
      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      Swal.fire({
        icon: 'success',
        title: 'Good news!',
        text: 'Product added to cart!',
        confirmButtonColor: '#1c5c69',
      });

      this.getAllCart();

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showCancelButton: true,
        confirmButtonText: 'Go to login',
        confirmButtonColor: '#1c5c69',
        text: 'Please login to add to cart!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }


}
