import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { BookFormComponent } from './book-form.component';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockBookService: Partial<BookService>;
  let mockAuthorService: Partial<AuthorService>;

  beforeEach(waitForAsync(() => {
    mockBookService = {
      createBook: jasmine.createSpy('createBook').and.returnValue(of({})),
    };

    mockAuthorService = {
      getAuthors: jasmine.createSpy('getAuthors').and.returnValue(of([
        { _id: '1', first_name: 'John', last_name: 'Doe' },
        { _id: '2', first_name: 'Jane', last_name: 'Smith' },
      ])),
    };

    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: BookService, useValue: mockBookService as BookService },
        { provide: AuthorService, useValue: mockAuthorService as AuthorService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    const formControls = component.bookForm.controls;
    expect(formControls['name'].value).toBe('');
    expect(formControls['isbn'].value).toBe('');
    expect(formControls['author'].value).toBe('');
  });

  it('should disable submit button when form is invalid', () => {
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('[type="submit"]');
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    const compiled = fixture.nativeElement;

    const nameInput = compiled.querySelector('#name');
    const isbnInput = compiled.querySelector('#isbn');
    const authorInput = compiled.querySelector('#author');
    const submitButton = compiled.querySelector('[type="submit"]');

    nameInput.value = 'Test Book';
    nameInput.dispatchEvent(new Event('input'));

    isbnInput.value = '123456';
    isbnInput.dispatchEvent(new Event('input'));

    authorInput.value = '1';
    authorInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(submitButton.disabled).toBe(false);
  });

  it('should call createBook method on form submission', () => {
    const compiled = fixture.nativeElement;

    const nameInput = compiled.querySelector('#name');
    const isbnInput = compiled.querySelector('#isbn');
    const authorInput = compiled.querySelector('#author');
    const submitButton = compiled.querySelector('[type="submit"]');

    nameInput.value = 'Test Book';
    nameInput.dispatchEvent(new Event('input'));

    isbnInput.value = '123456';
    isbnInput.dispatchEvent(new Event('input'));

    authorInput.value = '1';
    authorInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    submitButton.click();

    expect(mockBookService.createBook).toHaveBeenCalledWith({
      name: 'Test Book',
      isbn: '123456',
      author: '1',
    });
  });
});
