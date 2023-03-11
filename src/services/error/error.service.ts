import IError, { ErrorTypes } from "../../models/error"
import dbModel from "../../utils/db.model"
import IErrorService from "./i.error.service"

export default class ErrorService implements IErrorService {

    public reportError({message}: {message: string}): void {
        // Report the error
        console.log("Error reported! ", message)
    }

    public getErrorLog(error: unknown, type: ErrorTypes): IError {
        const errorMessage = this.getErrorMessage(error)
        const date = new Date()
        return {
            message: errorMessage,
            date: date,
            type: type
        }
    }
    
    public async log(error: IError): Promise<void> {
        await dbModel.errors.add(error)
    }

    private getErrorMessage(error: unknown): string {
        if(error instanceof Error) {
            return error.message
        }
        return String(error)
    }
}