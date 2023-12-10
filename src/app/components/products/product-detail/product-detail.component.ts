import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {} as Product;
  id: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.apiService.get('products/' + this.id).subscribe((res: any) => {
      this.product = res[0];

    });
  }

  onAddToCart() {
    if (localStorage.getItem('token')) {
      const product = {
        "user_id": localStorage.getItem('user_id'),
        "product_id": this.product.id,
        "quantity": 1
      }
      this.apiService.post('insertCart', product).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Good news!',
          text: 'Product added to cart!',
          confirmButtonColor: '#1c5c69',
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
        confirmButtonColor: '#1c5c69',
        text: 'Please login to add to cart!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      })

    }
  }

  getAllCart() {
    const userId = localStorage.getItem('user_id');
    this.apiService.get(`cart/${userId}`).subscribe((res: any) => {
      this.apiService.updateItemCount(res.length);
    })
  };
}
