import IUser from "../../models/user";

export default interface IUserService {
    sortUsersByAge: (users: IUser[]) => IUser[],
}