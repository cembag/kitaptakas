export interface IModals {
    language: boolean,
    signIn: boolean,
    signUp: boolean
}

const modalInitialState: IModals = {
    language: false,
    signIn: false,
    signUp: false
}

export default modalInitialState