import IError, { ErrorTypes } from "../../models/error";

export default interface IErrorService {
    getErrorLog: (error: unknown) => IError
    reportError: ({message}: {message: string}) => void
}