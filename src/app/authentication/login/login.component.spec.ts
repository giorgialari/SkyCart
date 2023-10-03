import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
let mockRouter: jasmine.SpyObj<Router>;


  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['login']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeTruthy();
  });

  it('should call AuthService.login() with form values', () => {
    const loginSpy = mockAuthService.login.and.returnValue(of({ userId: '123' }));
    component.ngOnInit();
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    component.login();

    expect(loginSpy).toHaveBeenCalledWith('user', 'pass');
  });

  it('should navigate to /products on successful login', () => {
    mockAuthService.login.and.returnValue(of({ userId: '123' }));
    component.ngOnInit();
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

});
