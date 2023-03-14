import firebase from "firebase"
import IUser from "../../models/user";
import dbModel from "../../utils/db.model";
import IUserDal from "../user.dal";


export default class UserDal implements IUserDal {


    public async register(email: string, password: string, data: Partial<IUser>) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((a) => {
            if(a) {
                const id = a.user!.uid

                const user: IUser = {
                    ...data,
                    id: id
                } as IUser

                this.addUser(user)
            }
        })
    }

    public async signOut() {

    }

    public async signIn() {
        
    }

    public async getUsers(): Promise<IUser[]> {
        return (await dbModel.users.get()).docs.map((user) => user.data())
    }

    public async addUser(user: IUser): Promise<void> {
        await dbModel.users.doc(user.id).set(user)
    }
    
    public async getUser(id: string): Promise<IUser> {
        return (await dbModel.users.doc(id).get()).data()!
    }

    public async updateUser(id: string, data: Partial<IUser>) {
        await dbModel.users.doc(id).update(data)
    }

    public async deleteUser(id: string) {
        await dbModel.users.doc(id).delete()
    }
}