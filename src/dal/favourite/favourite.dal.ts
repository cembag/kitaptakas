import firebase from "firebase/app"
import IBook from "../../models/book"
import dbModel from "../../utils/db.model"
import AuthDal from "../auth/auth.dal"

export default class FavouriteDal {
    
    private authDal = new AuthDal()
    
    public async add(bookId: string): Promise<void> {
        
        if(!this.authDal.hasAuthenticated()) throw {
            message: "Authentication required"
        }
    
        await dbModel.users.doc(firebase.auth().currentUser!.uid).update({
            "favourites": firebase.firestore.FieldValue.arrayUnion(bookId)
        })
    }
    
    public async delete(bookId: string): Promise<void> {
        
        if(!this.authDal.hasAuthenticated()) throw {
            message: "Authentication requied"
        }
    
        await dbModel.users.doc(firebase.auth().currentUser!.uid).update({
            "favourites": firebase.firestore.FieldValue.arrayRemove(bookId)
        })
    }
    
    public async get(): Promise<IBook[]> {
    
        if(!this.authDal.hasAuthenticated()) throw {
            message: "Authentication requied"
        }
        
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