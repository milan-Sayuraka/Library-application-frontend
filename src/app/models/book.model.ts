import { AuthorModel } from "./author.model";

export interface BookModel {
    _id: string;
    name: string;
    isbn: string;
    author: AuthorModel;
}
