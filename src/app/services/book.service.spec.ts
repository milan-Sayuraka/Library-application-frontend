import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { BookModel } from '../models/book.model';
import { AuthorModel } from '../models/author.model'; // Import AuthorModel

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

  it('should fetch books', () => {
    const mockBooks: BookModel[] = [
      { _id: '1', name: 'Book 1', isbn: '123456', author: {} as AuthorModel }, // Change author to an empty AuthorModel
      { _id: '2', name: 'Book 2', isbn: '789012', author: {} as AuthorModel }, // Change author to an empty AuthorModel
    ];

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books`); // Access private property
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should create a book', () => {
    const mockBook: BookModel = {
      _id: '1',
      name: 'New Book',
      isbn: '987654',
      author: {} as AuthorModel, // Change author to an empty AuthorModel
    };

    service.createBook(mockBook).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books`); // Access private property
    expect(req.request.method).toBe('POST');
    req.flush(mockBook);
  });

  it('should update a book', () => {
    const mockBook: BookModel = {
      _id: '1',
      name: 'Updated Book',
      isbn: '987654',
      author: {} as AuthorModel, // Change author to an empty AuthorModel
    };

    service.updateBook(mockBook).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books/${mockBook._id}`); // Access private property
    expect(req.request.method).toBe('PUT');
    req.flush(mockBook);
  });

  it('should delete a book', () => {
    const bookId = '1';

    service.deleteBook(+bookId).subscribe(() => { // Convert bookId to a number
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/books/${bookId}`); // Access private property
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
