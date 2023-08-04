import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { EditAuthorComponent } from './components/edit-author/edit-author.component';

const routes: Routes = [
  { path: 'list-books', component: BookListComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'create-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'create-author', component: AuthorFormComponent },
  { path: 'edit-author/:id', component: EditAuthorComponent },
  { path: '', redirectTo: '/list-books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
