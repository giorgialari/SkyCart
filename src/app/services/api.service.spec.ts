import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are pending.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET method', () => {
    const mockData = { key: 'value' };

    service.get('endpoint').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/endpoint`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should execute POST method', () => {
    const mockData = { key: 'value' };
    const postData = { data: 'data' };

    service.post<any>('endpoint', postData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/endpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });


  it('should execute PUT method', () => {
    const mockData = { key: 'value' };
    const putData = { data: 'data' };

    service.put<any>('endpoint', putData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/endpoint`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });


  it('should execute DELETE method', () => {
    service.delete('endpoint', 1).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/endpoint/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  it('should update item count', () => {
    let count = 0;
    service.currentItemCount.subscribe(c => count = c);

    service.updateItemCount(5);
    expect(count).toBe(5);

    service.updateItemCount(10);
    expect(count).toBe(10);
  });
});
