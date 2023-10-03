import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFilterComponent } from './products-filter.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { Product } from 'src/app/model/interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsFilterComponent', () => {
  let component: ProductsFilterComponent;
  let fixture: ComponentFixture<ProductsFilterComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsFilterComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products and emit an event', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', category: 'Category 1', rating: '5', price: '10.00' },
      { id: 2, title: 'Product 2', category: 'Category 2', rating: '4', price: '20.00' }
    ];

    mockApiService.get.and.returnValue(of(mockProducts));

    spyOn(component.productListEvent, 'emit');

    component.filterProducts();

    expect(mockApiService.get).toHaveBeenCalledWith('products/filter?title=&category=&price=0&rating=0');
    expect(component.productListEvent.emit).toHaveBeenCalledWith(mockProducts);
  });
});
