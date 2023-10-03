import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiService } from '../services/api.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login and store the token', () => {
    const mockResponse = { token: 'sample_token' };
    service.login('username', 'password').subscribe((response) => {
      expect(response.token).toBe('sample_token');
    });

    const req = httpMock.expectOne(req => req.method === 'POST');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(service.getToken()).toBe('sample_token');
  });


  it('should logout and remove the token', () => {
    service.logout();
    expect(service.getToken()).toBe('');
  });

  it('should return stored token', () => {
    localStorage.setItem('token', 'sample_token');
    expect(service.getToken()).toBe('sample_token');
    localStorage.removeItem('token');
  });
});
