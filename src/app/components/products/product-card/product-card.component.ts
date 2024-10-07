import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import tippy from 'tippy.js';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() rating: string = '';
  @Input() price: string = '';
  @Input() imageUrl: string = '';
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    tippy('#copyright-image', {
      content: `<div>
      <p>
        "Drone Skeletal Mesh" by dennis.robinson.dev. Original work available on
        <a
          href="https://sketchfab.com/3d-models/drone-skeletal-mesh-6249a0faf569407096d0928a86910f52"
          target="_blank"
          >Sketchfab</a
        >.
      </p>
    </div>`,
      allowHTML: true,
      trigger: 'click',
      interactive: true,
      placement: 'bottom',
      arrow: true
    });
  }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addToCart.emit();
  }

}
