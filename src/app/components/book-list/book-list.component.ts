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

  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 6;


  constructor(private bookService: BookService, private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks(this.currentPage, this.itemsPerPage);
  }

  getBooks(page: number, limit: number): void {
    this.subscriptions.push(
      this.bookService.getBooks(page, limit).subscribe(
        (booksResponse: any) => {
          this.books = booksResponse.books;
          this.currentPage = booksResponse.currentPage;
          this.totalPages = booksResponse.totalPages;
        },
        (error: any) => {
          console.error('Error fetching books:', error);
        }
      )
    );
  }

    // Generate an array of page numbers
    getPagesArray(totalPages: number): number[] {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getBooks(this.currentPage, this.itemsPerPage);
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
          this.getBooks(this.currentPage, this.itemsPerPage);
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
