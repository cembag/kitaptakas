import { createSlice } from "@reduxjs/toolkit"
import IUser from "../../models/user"
import { SetUserAction } from "./actions-user"
import initialStateUser from "./initial-state-user"


export const user = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {
        setUser: (state: IUser | null, action: SetUserAction) => {
            return state = action.payload
        }
    }
})

export const {setUser} = user.actions
export default user.reducer