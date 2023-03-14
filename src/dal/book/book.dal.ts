import firebase from "firebase"
import { BookTypes } from "../../context/book/book.types";
import IBook from "../../models/book";
import dbModel from "../../utils/db.model";
import IBookDal from "../book.dal";

export type Custom = {
    startAfter?: firebase.firestore.QueryDocumentSnapshot<IBook>,
    books: IBook[],
    fetching: boolean,
    fetched: boolean,
}

export default class BookDal implements IBookDal {

    private limit = 10

    public async addBook(book: IBook): Promise<void> {
        (await dbModel.books.add(book).then((book) => dbModel.books.doc(book.id).update({id: book.id})))
    }

    public async getBooksByType(type: BookTypes): Promise<IBook[]> {
        // Part part çek
        return (await dbModel.books.where("type", "==", type).get()).docs.map((book) => book.data())
    }

    public async getBooks(custom: Custom): Promise<Custom> {

        if(custom.startAfter) {
            const querySnapshot = await (dbModel.books.orderBy("created_at", "desc").startAfter(custom.startAfter).limit(this.limit).get())
            this.getCustom(querySnapshot, custom)
        } else {
            const querySnapshot = await (dbModel.books.orderBy("created_at", "desc").limit(this.limit).get())
            this.getCustom(querySnapshot, custom)
        }

        custom.fetching = false

        return custom
    }

    private getCustom(snapshot: firebase.firestore.QuerySnapshot<IBook>, custom: Custom): Custom {
        if(snapshot.docs.length < this.limit) {
            custom.fetched = true
        }

        snapshot.docs.forEach((book, index) => {
            if((index + 1) === this.limit) {
                custom.startAfter = book
            }

            custom.books.push(book.data())
        })
        return custom
    }

    public async getBook(id: string): Promise<IBook> {
        return (await dbModel.books.doc(id).get()).data()!
    }

    public async updateBook(id: string, data: Partial<IBook>): Promise<void> {
        return (await dbModel.books.doc(id).update(data))
    }

    public async deleteBook(id: string): Promise<void> {
        return (await dbModel.books.doc(id).delete())
    }
}