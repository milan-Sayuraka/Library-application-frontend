import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { EditBookComponent } from './edit-book.component';
import { BookService } from 'src/app/services/book.service';
import { BookModel } from 'src/app/models/book.model';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(waitForAsync(() => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBookById', 'updateBook']);

    TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: BookService, useValue: bookServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    mockBookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;

    const mockAuthor = { _id: '1515151', first_name: 'John', last_name: 'Doe' };

    const mockBook: BookModel = {
      _id: '1',
      name: 'Sample Book',
      isbn: 'sample',
      author: mockAuthor
    };

    mockBookService.getBookById.and.returnValue(of(mockBook));
    mockBookService.updateBook.and.returnValue(of(mockBook));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
