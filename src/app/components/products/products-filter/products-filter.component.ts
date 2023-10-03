import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/api.service';

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
    this.apiService.get('products/filter?' + 'title=' + this.title + '&category=' + this.category + '&price=' + this.price + '&rating=' + this.rating).subscribe((res: any) => {
      this.productList = res;
      this.productListEvent.emit(this.productList);
    })
  }
}

