import firebase from "firebase/app"
import { auth, rDb } from "../../config/firebase"
import IBook from "../../models/book"
import FavouriteService from "../../services/favourite/favourite.service"
import dbModel from "../../utils/db.model"

export type Custom = {
    
    isCompleted: boolean,
}

export default class FavouriteDal {
    
    private favouriteService = new FavouriteService()
    
    /** 
     * @throws {IError}
     */

    public async add(bookId: string): Promise<void> {

        await this.favouriteService.checkIsValidAddRequest()

        await rDb.ref("users/" + auth.currentUser!.uid).child("-favourites-count").set(firebase.database.ServerValue.increment(1))
        await rDb.ref("users/" + auth.currentUser!.uid + "/favourites").child(bookId).set(bookId)
        await rDb.ref("books/" + bookId).child("-favourites-count").set(firebase.database.ServerValue.increment(1))
        await rDb.ref("books/" + bookId + "/favourites").child(auth.currentUser!.uid).set(auth.currentUser!.uid)
    }

    /** 
     * @throws {IError}
     */

    public async delete(bookId: string): Promise<void> {

        this.favouriteService.checkIsValidDeleteRequest()

        await rDb.ref("users/" + auth.currentUser!.uid).child("-favourites-count").set(firebase.database.ServerValue.increment(-1))
        await rDb.ref("users/" + auth.currentUser!.uid + "/favourites").child(bookId).remove()
        await rDb.ref("books/" + bookId).child("-favourites-count").set(firebase.database.ServerValue.increment(-1))
        await rDb.ref("books/" + bookId + "/favourites").child(auth.currentUser!.uid).remove()
    }

    /** 
     * @throws {IError}
     */
    
    public async get(): Promise<IBook[]> {

        this.favouriteService.checkIsValidGetRequest()

        // Initial book list
        let books: IBook[] = []
        
        // Fetch user favourite book list
        const favourites: string[] = (await dbModel.users.doc(firebase.auth().currentUser!.uid).get()).get("favourites") as string[]
        
        // Check if list empty
        // if list empty basically do nothing, function will return empty list
        if(favourites.length > 0) {
            
            // Return book for every favourite book id and push book to book list
            favourites.forEach(async (favouriteId) => {
                const book: IBook = (await dbModel.books.doc(favouriteId).get()).data() as IBook
                books.push(book)
            })   
        }
        
        return books
    }
}