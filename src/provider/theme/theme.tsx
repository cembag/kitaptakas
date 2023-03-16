import { createSlice } from "@reduxjs/toolkit"
import ITheme from "../../models/theme"
import { ChangeThemeAction } from "./actions-theme"
import initialStateTheme from "./initial-state-theme"

export const theme = createSlice({
    name: "theme",
    initialState: initialStateTheme,
    reducers: {
        changeTheme: (state: ITheme, action: ChangeThemeAction) => {
            return state = action.payload
        }
    }
})

export const {changeTheme} = theme.actions
export default theme.reducer