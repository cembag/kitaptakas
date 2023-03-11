import { useEffect, useState } from "react"
import IUser from "../models/user"
import ErrorService from "../services/error/error.service"
import ErrorMessages from "../services/error/error.messages"
import dbModel from "../utils/db.model"
import { ErrorTypes } from "../models/error"

export default function useFetchUsers(): IUser[] {
    
    const errorService = new ErrorService()
    
    type UsersFetchState = {
        users: IUser[]
        error: {
            has_error: boolean
            message: string
        }
    }

    const [usersFetchState, setUsersFetchState] = useState<UsersFetchState>({
        users: [],
        error: {
            has_error: false,
            message: ""
        }
    })

    useEffect(() => {

        const userDisposable = dbModel.users.onSnapshot(function(snapshot) {
            setUsersFetchState(prev => ({...prev, users: []}))
            snapshot.docChanges().forEach(change => {
                if(change.type === "added") {
                    setUsersFetchState(prev => ({
                        ...prev,
                        users: [...prev.users, change.doc.data()]
                    }))
                }
            })
        }, async (error) => {
            const errorLog = errorService.getErrorLog(error, ErrorTypes.USERS_ONSNAPSHOT)
            await errorService.log(errorLog)
            setUsersFetchState(prev => ({
                ...prev,
                error: {
                    has_error: true,
                    message: ErrorMessages.USERS_ONSNAPSHOT
                }
            }))
        })
     

        return () => {
            userDisposable()
        };
    }, [])

    return usersFetchState.users
}