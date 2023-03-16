export type SnackbarStatus = "warning" | "error" | "notify" | "default"

export interface ISnackbar {
    message: string
    status: SnackbarStatus
    active: boolean
    showed: boolean
    time: number
    id: number
}

const snackbarInitialState: ISnackbar = {
    message: "",
    status: "default",
    active: false,
    showed: false,
    time: 5,
    id: 0
}

export default snackbarInitialState