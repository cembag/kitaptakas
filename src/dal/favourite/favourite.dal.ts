import firebase from "firebase/app"
import { auth, rDb } from "../../config/firebase"
import IBook from "../../models/book"
import FavouriteService from "../../services/favourite/favourite.service"
import dbModel from "../../utils/db.model"
import BookDal from "../book/book.dal"

export type CustomFavourite = {
    startAfter?: firebase.firestore.QueryDocumentSnapshot,
    books: IBook[],
    fetching: boolean,
    fetched: boolean,
}

export default class FavouriteDal {

    private limit = 10
    private favouriteService = new FavouriteService()
    private bookDal = new BookDal()
    
    /** 
     * @throws {IError}
     */

    public async add(bookId: string): Promise<void> {

        await this.favouriteService.checkIsValidAddRequest()
        const id = auth.currentUser!.uid

        await dbModel.users.doc(id).collection("favourites").doc(bookId).set({created_at: new Date()})
        await dbModel.users.doc(bookId).collection("favourites").doc(id).set({created_at: new Date()})
        await rDb.ref(`metadatas/count/users/${id}/favourites`).set(firebase.database.ServerValue.increment(1));
        await rDb.ref(`metadatas/count/books/${bookId}/favourites`).set(firebase.database.ServerValue.increment(1));
    }

    /** 
     * @throws {IError}
     */

    public async delete(bookId: string): Promise<void> {

        this.favouriteService.checkIsValidDeleteRequest()
        const id = auth.currentUser!.uid

        await dbModel.users.doc(id).collection("favourites").doc(bookId).delete()
        await dbModel.users.doc(bookId).collection("favourites").doc(id).delete()
        await rDb.ref(`metadatas/count/users/${id}/favourites`).set(firebase.database.ServerValue.increment(-1));
        await rDb.ref(`metadatas/count/books/${bookId}/favourites`).set(firebase.database.ServerValue.increment(-1));
    }

    /** 
     * @throws {IError}
     */
    
    public async get(custom: CustomFavourite): Promise<CustomFavourite> {

        this.favouriteService.checkIsValidGetRequest()

        if(custom.startAfter) {
            const querySnapshot = await dbModel.users.doc(auth.currentUser!.uid).collection("favourites").startAfter(custom.startAfter).limit(this.limit).get()
            await this.getCustomFavourite(querySnapshot, custom)
        } else {
            const querySnapshot = await dbModel.users.doc(auth.currentUser!.uid).collection("favourites").limit(this.limit).get()
            await this.getCustomFavourite(querySnapshot, custom)
        }
        
        return custom
    }

    private async getCustomFavourite(snapshot: firebase.firestore.QuerySnapshot, custom: CustomFavourite): Promise<CustomFavourite> {
        if(snapshot.docs.length < this.limit) {
            custom.fetched = true
        }

        snapshot.docs.forEach( async (bookSnapshot, index) => {
            if((index + 1) === snapshot.docs.length) {
                custom.startAfter = bookSnapshot
            }

            const book = await this.bookDal.getBook(bookSnapshot.id)
            custom.books.push(book)
        })
        return custom
    }
}