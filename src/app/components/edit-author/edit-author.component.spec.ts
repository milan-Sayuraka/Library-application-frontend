import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { EditAuthorComponent } from './edit-author.component';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';

describe('EditAuthorComponent', () => {
  let component: EditAuthorComponent;
  let fixture: ComponentFixture<EditAuthorComponent>;
  let mockAuthorService: jasmine.SpyObj<AuthorService>;

  beforeEach(waitForAsync(() => {
    const authorServiceSpy = jasmine.createSpyObj('AuthorService', ['getAuthors', 'getAuthorById', 'updateAuthor']);

    const mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };

    TestBed.configureTestingModule({
      declarations: [ EditAuthorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [
        { provide: AuthorService, useValue: authorServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthorComponent);
    component = fixture.componentInstance;
    mockAuthorService = TestBed.inject(AuthorService) as jasmine.SpyObj<AuthorService>;
    
    mockAuthorService.getAuthors.and.returnValue(of([]));
    const mockAuthor: AuthorModel = { _id: '1', first_name: 'John', last_name: 'Doe' };
    mockAuthorService.getAuthorById.and.returnValue(of(mockAuthor));
    mockAuthorService.updateAuthor.and.returnValue(of(mockAuthor));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
