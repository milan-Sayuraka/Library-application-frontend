import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { environment } from '../../environments/environment';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthorService,
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    service = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve authors from API', () => {
    const mockAuthors = [
      { _id: '1', first_name: 'John', last_name: 'Doe' },
      { _id: '2', first_name: 'Jane', last_name: 'Smith' }
    ];

    service.getAuthors().subscribe(authors => {
      expect(authors).toEqual(mockAuthors);
    });

    const req = httpMock.expectOne(`${environment.API_KEY}/authors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  });

  it('should retrieve an author by ID from API', () => {
    const mockAuthor = { _id: '1', first_name: 'John', last_name: 'Doe' };

    service.getAuthorById('1').subscribe(author => {
      expect(author).toEqual(mockAuthor);
    });

    const req = httpMock.expectOne(`${environment.API_KEY}/author/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthor);
  });

  it('should create an author', () => {
    const mockAuthor = { _id: '0', first_name: 'John', last_name: 'Doe' };
  
    service.createAuthor(mockAuthor).subscribe(author => {
      expect(author).toEqual(mockAuthor);
    });
  
    const req = httpMock.expectOne(`${environment.API_KEY}/authors`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthor);
  });

  it('should update an author', () => {
    const mockAuthor = { _id: '1', first_name: 'John', last_name: 'Updated' };

    service.updateAuthor('1', mockAuthor).subscribe(author => {
      expect(author).toEqual(mockAuthor);
    });

    const req = httpMock.expectOne(`${environment.API_KEY}/author/1`); 
    expect(req.request.method).toBe('PUT');
    req.flush(mockAuthor);
  });
});
