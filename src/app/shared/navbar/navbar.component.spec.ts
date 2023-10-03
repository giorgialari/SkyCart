import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['currentItemCount']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.currentItemCount = new BehaviorSubject(0);

    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be logged in if token exists', () => {
    localStorage.setItem('token', 'some-token');
    component.ngOnInit();
    expect(component.isLoggedin).toBe(true);
  });

  it('should not be logged in if no token exists', () => {
    localStorage.removeItem('token');
    component.ngOnInit();
    expect(component.isLoggedin).toBe(false);
  });


  it('should call authService.logout and navigate to /products when logout is called', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
    expect(component.isLoggedin).toBe(false);
  });

  it('should navigate to /login when goToLogin is called', () => {
    component.goToLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
