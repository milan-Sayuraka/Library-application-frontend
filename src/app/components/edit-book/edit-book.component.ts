import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { forkJoin, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  book: any;
  authors: any[] = []; 
  private subscriptions: Subscription[] = [];
  image = 'https://theblackhistorychannel.com/wp-content/uploads/2015/11/SampleBook.png'

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder 
  ) {
    this.bookForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required], 
      isbn: ['', Validators.required],
      author: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBookDetails(id);
    }

    this.fetchAuthors();
  }

  goBack(): void {
    this.router.navigate(['/list-books']);
  }

  updateAuthor(authorId: string): void {
    this.router.navigate(['/edit-author', authorId]);
  }

  getBookDetails(id: string): void {
    this.bookService.getBookById(id).subscribe(
      (data: any) => {
        this.book = data;
        this.populateFormWithData();
      },
      (error: any) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  isAuthorSelected(): boolean {
    const authorControl = this.bookForm.get('author');
    return authorControl?.value !== null && authorControl?.value !== '';
  }

  
  populateFormWithData(): void {
    if (this.book && this.authors.length > 0) {
      this.bookForm.setValue({
        _id: this.book._id,
        name: this.book.name,
        isbn: this.book.isbn,
        author: this.book.author._id 
      });

      const selectedAuthor = this.authors.find(author => author._id === this.book.author._id );
      if (selectedAuthor) {
        this.bookForm.get('author')?.setValue(selectedAuthor._id);
      }
    }
  }

  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: any[]) => {
        this.authors = authors;
        if (this.book) {
          this.populateFormWithData();
        }
      },
      (error: any) => {
        console.error('Error fetching authors:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value).subscribe(
        () => {
          this.router.navigate(['/list-books']);
        },
        (error: any) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  isControlInvalid(controlName: string): boolean {
    return this.bookForm.get(controlName)!.invalid &&
      (this.bookForm.get(controlName)!.touched || this.bookForm.get(controlName)!.dirty) &&
      !(controlName === 'author' && this.isAuthorSelected());
  }
  
  isControlTouched(controlName: string): boolean {
    return this.bookForm.get(controlName)!.touched || this.bookForm.get(controlName)!.dirty;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
