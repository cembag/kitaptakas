import { BookType } from "../../context/book/book.types";
import IBook from "../../models/book";

export default class BookService {
    public filterBooksByType(books: IBook[], type: BookType): IBook[] {
        return books.filter((book) => book.type === type)
    }
}