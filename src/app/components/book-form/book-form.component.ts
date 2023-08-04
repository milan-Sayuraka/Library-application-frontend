import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  authors: AuthorModel[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService, 
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      isbn: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: AuthorModel[]) => {
        this.authors = authors;
      },
      (error: any) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }
    this.bookService.createBook(this.bookForm.value).subscribe(() => {
      this.bookForm.reset();
      this.router.navigate(['/list-books']);
    });
  }

  isControlInvalid(controlName: string): boolean {
    return this.bookForm.get(controlName)?.invalid || false;
  }

  isControlTouched(controlName: string): boolean {
    return this.bookForm.get(controlName)?.touched || false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
