import { PayloadAction } from "@reduxjs/toolkit";
import { SnackbarStatus } from "./snackbar.initial.state";

type SetSnackbarAction = PayloadAction<{
    message: string,
    status: SnackbarStatus
    id: number
}>

export default SetSnackbarAction