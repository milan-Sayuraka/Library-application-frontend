import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { BookModel } from '../models/book.model';
import { AuthorModel } from '../models/author.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books with pagination', () => {
    const mockPage = 2;
    const mockLimit = 10;
    const mockBooksResponse: any = {
      totalBooks: 2,
      currentPage: mockPage,
      totalPages: 1,
      books: [
        {
          _id: '1',
          name: 'Book 1',
          isbn: '123456',
          author: {},
        },
        {
          _id: '2',
          name: 'Book 2',
          isbn: '789012',
          author: {},
        },
      ],
    };
  
    service.getBooks(mockPage, mockLimit).subscribe((response) => {
      expect(response).toEqual(mockBooksResponse);
    });
  
    const req = httpMock.expectOne(`${service['BASE_URL']}/books?page=${mockPage}&limit=${mockLimit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooksResponse);
  });
  
  
  

  it('should create a book', () => {
    const mockBook: BookModel = {
      _id: '1',
      name: 'New Book',
      isbn: '987654',
      author: {} as AuthorModel,
    };

    service.createBook(mockBook).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books`);
    expect(req.request.method).toBe('POST');
    req.flush(mockBook);
  });

  it('should update a book', () => {
    const mockBook: BookModel = {
      _id: '1',
      name: 'Updated Book',
      isbn: '987654',
      author: {} as AuthorModel, 
    };

    service.updateBook(mockBook).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books/${mockBook._id}`); 
    expect(req.request.method).toBe('PUT');
    req.flush(mockBook);
  });

  it('should delete a book', () => {
    const bookId = '1';

    service.deleteBook(+bookId).subscribe(() => { 
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books/${bookId}`); 
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
