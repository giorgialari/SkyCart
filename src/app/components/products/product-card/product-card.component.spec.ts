
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProductCardComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when onAddToCart is called', () => {
    spyOn(component.addToCart, 'emit');

    component.onAddToCart();

    expect(component.addToCart.emit).toHaveBeenCalled();
  });
});
