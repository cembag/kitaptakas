import { ErrorCode } from "../context/error/codes";
import { ErrorMessage } from "../context/error/messages";
import { ErrorType } from "../context/error/types";

export default interface IError {
    code: ErrorCode,
    type: ErrorType,
    message: ErrorMessage,
}