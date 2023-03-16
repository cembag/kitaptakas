import IUser from "../../models/user";
import IUserService from "./i.user.service";

export default class UserService implements IUserService {
    
    public sortUsersByAge(users: IUser[]) {
        return users.sort((a, b) => a.age - b.age)
    }

    // public filterUsers(users: IUser[]) {
    //     return users.filter((user) => user.has_premium)
    // }
}