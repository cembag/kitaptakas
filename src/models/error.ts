export enum ErrorTypes {
    FETCH_USER = "FETCH_USER",
    USERS_ONSNAPSHOT = "USERS_ONSNAPSHOT",
    FETCH_PRODUCTS = "FETCH_PRODUCTS",
    FIND_SOULMATE = "FIND_SOULMATE",
}

export default interface IError {
    message: string,
    date: Date,
    type: ErrorTypes
}