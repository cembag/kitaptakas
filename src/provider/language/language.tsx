import { createSlice } from "@reduxjs/toolkit"
import ILanguage from "../../models/language"
import { ChangeLanguageAction } from "./actions-language"
import initialStateLanguage from "./initial-state-language"


export const language = createSlice({
    name: "theme",
    initialState: initialStateLanguage,
    reducers: {
        changeLanguage: (state: ILanguage, action:ChangeLanguageAction) => {
            return state = action.payload
        }
    }
})

export const {changeLanguage} = language.actions
export default language.reducer