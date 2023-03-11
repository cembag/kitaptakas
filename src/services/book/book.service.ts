import { BookTypes } from "../../context/book/book.types";
import IBook from "../../models/book";

export default class BookService {
    public filterBooksByType(books: IBook[], type: BookTypes): IBook[] {
        return books.filter((book) => book.type === type)
    }
}