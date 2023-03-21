import { createSlice } from "@reduxjs/toolkit"
import { AddToFavourite, DeleteFromFavourite, SetUserAction, SetUserFavourites, SetUserTrades } from "./actions-user"
import initialStateUser, { UserData } from "./initial-state-user"


export const user = createSlice({
    name: "globalUser",
    initialState: initialStateUser,
    reducers: {
        setUser: (state: UserData, action: SetUserAction) => {
            state.user = action.payload
        },
        setFavourites: (state: UserData, action: SetUserFavourites) => {
            state.favourites = action.payload
        },
        addToFavourites: (state: UserData, action: AddToFavourite) => {
            state.favourites.push(action.payload)
        },
        removeFromFavourites: (state: UserData, action: DeleteFromFavourite) => {
            const index = state.favourites.indexOf(action.payload, 1)
            state.favourites.splice(index, 1)
        },
        setTrades: (state: UserData, action: SetUserTrades) => {
            state.favourites = action.payload
        },
    }
})

export const {setUser, setFavourites, addToFavourites, removeFromFavourites, setTrades} = user.actions
export default user.reducer