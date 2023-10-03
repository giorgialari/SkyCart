import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { CartComponent } from './cart.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let apiService: ApiService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CartComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    location = TestBed.inject(Location);

    spyOn(apiService, 'get').and.returnValue(of([{price: 10, quantity: 1}, {price: 20, quantity: 2}]));
    spyOn(apiService, 'delete').and.returnValue(of({}));
    spyOn(Swal, 'fire');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on initialization', () => {
    expect(component.cards.length).toBe(2);
    expect(component.subtotal).toBe(50);
    expect(component.total).toBe(70);
  });

  it('should go back to the previous page', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should delete a cart item', () => {
    component.deleteCart(1);
    expect(apiService.delete).toHaveBeenCalledWith('deleteCart', 1);
  });

  it('should perform payment', () => {
    component.payment();
    expect(Swal.fire).toHaveBeenCalled();
  });
});
