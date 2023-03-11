import IError, { ErrorTypes } from "../../models/error";

export default interface IErrorService {
    log: (error: IError) => Promise<void>
    getErrorLog: (error: unknown, type: ErrorTypes) => IError
    reportError: ({message}: {message: string}) => void
}