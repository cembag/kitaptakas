import { createSlice } from "@reduxjs/toolkit";
import SetModalAction from "./modals.actions";
import modalInitialState, { IModals } from "./modals.initial.state";

export const modals = createSlice({
    name: "modals",
    initialState: modalInitialState,
    reducers: {
        setLanguageModal: (state: IModals, action: SetModalAction) => {
            state.language = action.payload
        },
        setSigninModal: (state: IModals, action: SetModalAction) => {
            state.signIn = action.payload
        },
        setSignupModal: (state: IModals, action: SetModalAction) => {
            state.signUp = action.payload
        }
    }
})

export const {setLanguageModal, setSigninModal, setSignupModal} = modals.actions
export default modals.reducer