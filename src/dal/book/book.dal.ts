import firebase from "firebase"
import { FilterState } from "../../context/book/book.filter";
import { BookType } from "../../context/book/book.types";
import IBook from "../../models/book";
import dbModel from "../../utils/db.model";
import IBookDal from "../book.dal";

export type Custom = {
    startAfter?: firebase.firestore.QueryDocumentSnapshot<IBook>,
    filter?: FilterState,
    books: IBook[],
    fetching: boolean,
    fetched: boolean,
}

export default class BookDal implements IBookDal {

    private limit = 10

    public async addBook(book: IBook): Promise<void> {
        (await dbModel.books.add(book).then((book) => dbModel.books.doc(book.id).update({id: book.id})))
    }

    public async getBooksByType(type: BookType): Promise<IBook[]> {
        // Part part çek
        return (await dbModel.books.where("type", "==", type).get()).docs.map((book) => book.data())
    }

    public async getBooks(custom: Custom): Promise<Custom> {

        if(custom.startAfter) {
            let query: firebase.firestore.Query<IBook> = dbModel.books
            
            if(custom.filter) {
              query = this.applyFilters(custom.filter)  
            }
            
            const querySnapshot = await query.startAfter(custom.startAfter).limit(this.limit).get()
            
            this.getCustom(querySnapshot, custom)
        } else {
            let query: firebase.firestore.Query<IBook> = dbModel.books
            
            if(custom.filter) {
                query = this.applyFilters(custom.filter)
            }
        
            const querySnapshot = await query.limit(this.limit).get()
            this.getCustom(querySnapshot, custom)
        }

        custom.fetching = false

        return custom
    }
    
    private applyFilters(filter: FilterState): firebase.firestore.Query<IBook> {
    
        let query = dbModel.books.orderBy("created_at", "desc")
        
        if(filter.client.number_of_pages && filter.client.number_of_pages.min && filter.client.number_of_pages.max) {
            query = dbModel.books.where("number_of_pages", ">=", Number(filter.client.number_of_pages.min)).where("number_of_pages", "<=", Number(filter.client.number_of_pages.max)).orderBy("number_of_pages", "desc")
        }

        if(filter.client.condition) {
            query = query.where("condition", "==", filter.client.condition)
        }

        if(filter.client.legibility) {
            query = query.where("legibility", "==", filter.client.legibility)
        }
        
        if(filter.client.type && filter.client.type.length > 0) {
            query = query.where("type", "in", filter.client.type)
        }
        
        if(filter.client.has_missing_page && filter.client.has_missing_page) {
            query = query.where("has_missing_page", "==", filter.client.has_missing_page)
        }
    
        return query
    }

    private getCustom(snapshot: firebase.firestore.QuerySnapshot<IBook>, custom: Custom): Custom {
        if(snapshot.docs.length < this.limit) {
            custom.fetched = true
        }

        snapshot.docs.forEach((book, index) => {
            if((index + 1) === snapshot.docs.length) {
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