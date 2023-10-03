import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() productList: Product[] = [];
  productListFiltered: Product[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCart();
  }

  getAllProducts() {
    this.apiService.get('products').subscribe((res: any) => {
      this.productList = res;
    });
  }
  onFilterProducts(e: any) {
    this.productListFiltered = e;
    this.productList = this.productListFiltered;
  }

  getAllCart() {
    const userId = localStorage.getItem('user_id');
    this.apiService.get(`cart/${userId}`).subscribe((res: any) => {
      this.apiService.updateItemCount(res.length);
    })
  };
  onAddToCart(e: any) {
    if (localStorage.getItem('token')) {
      const product = {
        "user_id": localStorage.getItem('user_id'),
        "product_id": e.id,
        "quantity": 1
      }
      this.apiService.post('insertCart', product).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Good news!',
          text: 'Product added to cart!'
        });
        this.getAllCart();
      }
      );

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showCancelButton: true,
        confirmButtonText: 'Go to login',
        text: 'Please login to add to cart!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      })

    }
  }
}
