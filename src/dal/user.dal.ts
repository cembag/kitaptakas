import IUser from "../models/user";

export default interface IUserDal {
    getUser: (id: string) => Promise<IUser>
    updateUser: (id: string, data: Partial<IUser>) => Promise<void>
    deleteUser: (id: string) => Promise<void>
}