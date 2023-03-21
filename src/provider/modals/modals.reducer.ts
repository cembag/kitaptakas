import { createSlice } from "@reduxjs/toolkit";
import {SetModalAction, SetTradeModalAction} from "./modals.actions";
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
        },
        setTradeModal: (state: IModals, action: SetTradeModalAction) => {
            state.trade = action.payload
        }
    }
})

export const {setLanguageModal, setSigninModal, setSignupModal, setTradeModal} = modals.actions
export default modals.reducer