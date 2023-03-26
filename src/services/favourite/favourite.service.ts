import { auth, rDb } from "../../config/firebase"
import AuthDal from "../../dal/auth/auth.dal"
import IError from "../../models/error"

export default class FavouriteService {

    private authDal = new AuthDal()
    private favouriteLimit = 100
    
    public async checkIsValidAddRequest() {
        if(!this.authDal.hasAuthenticated()) throw {
            code: "405",
            type: "auth",
            message: "Authentication required, you must sign in or register."
        } as IError

        const favouriteLength = (await rDb.ref(`metadatas/count/users/${auth.currentUser!.uid}/favourites`).get()).val()

        if(favouriteLength >= this.favouriteLimit) throw {
            code: "407",
            type: "favourite",
            message: "Reached maximum favourite amount, you have 100 favourite book"
        } as IError
    }

    public checkIsValidDeleteRequest() {
        if(!this.authDal.hasAuthenticated()) throw {
            code: "405",
            type: "auth",
            message: "Authentication required, you must sign in or register."
        } as IError
    }

    public checkIsValidGetRequest() {
        if(!this.authDal.hasAuthenticated()) throw {
            code: "405",
            type: "auth",
            message: "Authentication required, you must sign in or register."
        } as IError
    }
}