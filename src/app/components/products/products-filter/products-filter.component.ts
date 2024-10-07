import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { PRODUCTS } from 'src/app/shared/data/data';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  title: string = '';
  category: string = '';
  price: number = 0;
  rating: number = 0;
  productList: Product[] = [];
  @Output() productListEvent = new EventEmitter<Product[]>();
  constructor(private apiService: ApiService) { }


  ngOnInit() { }
  filterProducts() {
    const allProducts = PRODUCTS;
    let filteredProducts = allProducts.filter((product) => {
      return (
        (!this.title || product.title.toLowerCase().includes(this.title.toLowerCase())) &&
        (!this.category || product.category.toLowerCase().includes(this.category.toLowerCase())) &&
        (!this.price || +product.price <= +this.price) &&
        (!this.rating || +product.rating >= +this.rating)
      );
    });

    this.productListEvent.emit(filteredProducts);
  }

}

