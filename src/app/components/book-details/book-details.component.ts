import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs'; 
import { BookService } from 'src/app/services/book.service'; 
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  author: any;
  image = 'https://t4.ftcdn.net/jpg/02/42/55/89/360_F_242558919_XtgUjW50qICrYe68nOO0kj9doe1sWxeu.jpg'
  private subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBookDetails(id);
      }
    });
  }

  getBookDetails(id: string): void {
    this.bookService.getBookById(id).subscribe((data: any) => {
      this.book = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/list-books']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
