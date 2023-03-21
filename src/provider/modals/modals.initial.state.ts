export interface IModals {
    language: boolean,
    signIn: boolean,
    signUp: boolean,
    trade: string
}

const modalInitialState: IModals = {
    language: false,
    signIn: false,
    signUp: false,
    trade: ""
}

export default modalInitialState