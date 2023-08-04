import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {  Observer, fromEvent, merge } from 'rxjs';
import {  AuthorModel } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private BASE_URL = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(`${this.BASE_URL}/authors`).pipe(
      catchError(this.handleError)
    );
  }

  getAuthorById(id: string): Observable<AuthorModel> {
    return this.http.get<AuthorModel>(`${this.BASE_URL}/author/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createAuthor(author: AuthorModel): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(`${this.BASE_URL}/authors`, author).pipe(
      catchError(this.handleError)
    );
  }

  updateAuthor(id: string, author: AuthorModel): Observable<AuthorModel> {
    return this.http.put<AuthorModel>(`${this.BASE_URL}/author/${id}`, author).pipe(
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
