import { createSlice } from "@reduxjs/toolkit";
import SetSnackbarAction from "./snackbar.actions";
import snackbarInitialState, { ISnackbar } from "./snackbar.initial.state";

const snackbar = createSlice({
    name: "snackbar",
    initialState: snackbarInitialState,
    reducers: {
        setSnackbar: (state: ISnackbar, action: SetSnackbarAction) => {
            return state = {...action.payload, time: 5, active: true, showed: false}
        }
    } 
})

export const { setSnackbar } = snackbar.actions 
export default snackbar.reducer