import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() rating: string = '';
  @Input() price: string = '';
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addToCart.emit();
  }

}
