import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from './products.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ProductsComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);

    spyOn(apiService, 'get').and.returnValue(of([{id: 1, title: 'Product 1', category: 'Cat 1', rating: '5', price: '10'}]));
    spyOn(apiService, 'post').and.returnValue(of({}));
    spyOn(apiService, 'updateItemCount');
    spyOn(Swal, 'fire');
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products on initialization', () => {
    expect(apiService.get).toHaveBeenCalledWith('products');
    expect(component.productList.length).toBe(1);
  });

  it('should filter products', () => {
    const filteredProducts = [{id: 2, title: 'Product 2', category: 'Cat 2', rating: '4', price: '20'}];
    component.onFilterProducts(filteredProducts);
    expect(component.productList).toEqual(filteredProducts);
  });

  it('should add a product to the cart', () => {
    localStorage.setItem('token', 'someToken');
    localStorage.setItem('user_id', '1');

    component.onAddToCart({id: 1});
    expect(apiService.post).toHaveBeenCalled();
  });

});
