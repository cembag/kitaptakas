import firebase from "firebase/app"
import { auth } from "../../config/firebase";
import IUser from "../../models/user";
import IAuthDal from "../auth.dal";
import UserDal from "../user/user.dal";

export default class AuthDal implements IAuthDal {

    private userDal = new UserDal()

    public async register(email: string, password: string, data: Partial<IUser>) {
        auth.createUserWithEmailAndPassword(email, password).then(async (a) => {
            if(a) {

                await auth.currentUser?.updateProfile({
                    displayName: data.username ?? null,
                })

                const id = a.user!.uid

                const user: IUser = {
                    ...data,
                    id: id
                } as IUser

                this.userDal.addUser(user)
            }
        })
    }

    public async signOut() {
        await auth.signOut()
    }

    public async signIn(email: string, password: string): Promise<void> {
        await auth.signInWithEmailAndPassword(email, password)
    }
    
    public hasAuthenticated(): boolean {
        if(firebase.auth().currentUser) return true
        return false
    }
}