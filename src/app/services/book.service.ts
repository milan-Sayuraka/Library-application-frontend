import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {  Observer, fromEvent, merge } from 'rxjs';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.BASE_URL}/books`).pipe(
      catchError(this.handleError)
    );
  }

  getBookById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.BASE_URL}/books/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${this.BASE_URL}/books`, book).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: BookModel): Observable<BookModel> {
    return this.http.put<BookModel>(`${this.BASE_URL}/books/${book._id}`, book).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/books/${id}`).pipe(
      catchError(this.handleError)
    );
  }

        // Error Handling
        handleError(error: HttpErrorResponse) {
          let errorMessage = 'Unknown error!';
          if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side errors
            
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // window.alert(errorMessage);
          return throwError(errorMessage);
        }

}
