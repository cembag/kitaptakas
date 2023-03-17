import IUser from "../../models/user";
import dbModel from "../../utils/db.model";
import IUserDal from "../user.dal";

export default class UserDal implements IUserDal {

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