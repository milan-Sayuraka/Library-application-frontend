import { AuthorModel } from "./author.model";

export interface BookModel {
    _id: string;
    name: string;
    isbn: string;
    author: AuthorModel;
}

export interface PaginatedBooks {
    totalBooks: number;
    currentPage: number;
    totalPages: number;
    books: BookModel[];
}