import { ErrorTypes } from "../../models/error"

const ErrorMessages: {[key in ErrorTypes]: string} = {
    FETCH_USER: "Some error accured while fetching user.",
    USERS_ONSNAPSHOT: "Some error accured while fetching users.",
    FETCH_PRODUCTS: "Some error accured while fetching products.",
    FIND_SOULMATE: "Some error accured while finding soulmate.",
}

export default ErrorMessages