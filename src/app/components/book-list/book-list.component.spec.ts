import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import { of } from 'rxjs';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: Partial<BookService>;
  let mockAuthorService: Partial<AuthorService>;

  beforeEach(async () => {
    mockBookService = {
      getBooks: jasmine.createSpy('getBooks').and.returnValue(of([])),
      deleteBook: jasmine.createSpy('deleteBook').and.returnValue(of(null)),
    };

    mockAuthorService = {
      getAuthorById: jasmine.createSpy('getAuthorById').and.returnValue(of({ _id: '1', first_name: 'John', last_name: 'Doe' })),
    };

    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: BookService, useValue: mockBookService as BookService },
        { provide: AuthorService, useValue: mockAuthorService as AuthorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display books', () => {
    const mockBooks = [
      { _id: '1', name: 'Book 1', isbn: '123456', author: '1' },
      { _id: '2', name: 'Book 2', isbn: '789012', author: '1' },
    ];
    mockBookService.getBooks = jasmine.createSpy().and.returnValue(of(mockBooks));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.books).toEqual(mockBooks);
  });

  it('should delete a book', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const bookId = 1;
    component.deleteDetails(bookId);
    expect(mockBookService.deleteBook).toHaveBeenCalledWith(bookId);
    expect(mockBookService.getBooks).toHaveBeenCalled();
  });
});
