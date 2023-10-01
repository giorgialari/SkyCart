import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }


  productList: Product[] = [
    {
      id: 1,
      title: 'Drone X1',
      category: 'Entry-Level',
      rating: '4.2',
      price: '200'
    },
    {
      id: 2,
      title: 'SkyMaster Pro',
      category: 'Professional',
      rating: '4.8',
      price: '1500'
    },
    {
      id: 3,
      title: 'FlyEase Mini',
      category: 'Portable',
      rating: '3.9',
      price: '120'
    },
    {
      id: 4,
      title: 'AeroSwift X3',
      category: 'Racing',
      rating: '4.5',
      price: '350'
    },
    {
      id: 5,
      title: 'VisionMaster',
      category: 'Photography',
      rating: '4.7',
      price: '800'
    },
    {
      id: 6,
      title: 'Explorer Z200',
      category: 'Outdoor',
      rating: '4.3',
      price: '250'
    }
  ];
  onAddToCart(e: any) {
    if (localStorage.getItem('token')) {
      Swal.fire({
        icon: 'success',
        title: 'Good news!',
        text: 'Product added to cart!'
      });
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
interface Product {
  id: number;
  title: string;
  category: string;
  rating: string;
  price: string;
}
