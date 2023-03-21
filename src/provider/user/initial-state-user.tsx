import IUser from "../../models/user"

export type UserData = {
    user: IUser | null,
    favourites: string[],
    trades: string[]
}

const initialStateUserData: UserData = {
    user: null,
    favourites: [],
    trades: []
}

export default initialStateUserData