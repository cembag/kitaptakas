import IError, { ErrorTypes } from "../../models/error"
import dbModel from "../../utils/db.model"
import IErrorService from "./i.error.service"

export type ResponseStatus = "success" | "failed"

export type CustomAsyncResponse = {
    status: ResponseStatus,
    onProcess: boolean,
    errorMessage: string,
    //response: object | [] | string | boolean,
}

export default class ErrorService implements IErrorService {

    public reportError({message}: {message: string}): void {
        // Report the error
        console.log("Error reported! ", message)
    }

    public getErrorLog(error: unknown): IError {
        const errorMessage = this.getErrorMessage(error)
        const date = new Date()
        return {
            message: errorMessage,
            date: date,
        }
    }
    
    private async log(error: IError): Promise<void> {
        await dbModel.errors.add(error)
    }

    private getErrorMessage(error: unknown): string {
        if(error instanceof Error) {
            return error.message
        }
        return String(error)
    }
    
    public async catchIfError(func: Promise<void>, customResponse: CustomAsyncResponse): Promise<CustomAsyncResponse> {
        try {
            await func
            customResponse.status = "success"
        } catch (error) {
            const errorMessage = this.getErrorMessage(error)
            const errorLog = this.getErrorLog(error)
            await this.log(errorLog)
            customResponse.status = "failed"
            customResponse.errorMessage = errorMessage
        }
        
        customResponse.onProcess = false
        
        return customResponse
    }
}