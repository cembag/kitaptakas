export interface IModals {
    language: boolean,
    signIn: boolean,
    signUp: boolean,
    trade: string,
    addbook: boolean,
}

const modalInitialState: IModals = {
    language: false,
    signIn: false,
    signUp: false,
    trade: "",
    addbook: false
}

export default modalInitialState