import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['post']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if passwords match', () => {
    component.password = 'test';
    component.confirmPassword = 'test';
    expect(component.checkPasswords()).toBeTrue();
  });

  it('should fail if passwords do not match', () => {
    component.password = 'test';
    component.confirmPassword = 'different';
    expect(component.checkPasswords()).toBeFalse();
  });



  it('should handle registration error', () => {
    mockApiService.post.and.returnValue(throwError({ error: { error: 'Error message' }}));
    component.register();
    expect(mockApiService.post).toHaveBeenCalled();

  });
});
