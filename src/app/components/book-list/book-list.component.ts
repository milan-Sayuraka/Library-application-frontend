import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs'; 
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service'; 
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] | undefined;
  authors: { [key: string]: AuthorModel } = {};
  private subscriptions: Subscription[] = [];
  image = 'https://t4.ftcdn.net/jpg/02/42/55/89/360_F_242558919_XtgUjW50qICrYe68nOO0kj9doe1sWxeu.jpg'

  constructor(private bookService: BookService, private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books: any[]) => {
      this.books = books;
      const authorIds = books.map(book => book.author);
      forkJoin(authorIds.map(id => this.authorService.getAuthorById(id))).subscribe(
        (authors: AuthorModel[]) => {
          authors.forEach(author => (this.authors[author._id] = author));
        },
        (error: any) => {
          console.error('Error fetching authors:', error);
        }
      );
    });
  }
  

  showDetails(id: string): void {
    this.router.navigate(['/book-details', id]);
  }

  updateDetails(id: string): void {
    this.router.navigate(['/edit-book', id]);
  }

  deleteDetails(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(
        () => {
          this.getBooks();
        },
        (error: any) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
