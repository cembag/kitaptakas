import React, { useEffect } from "react"
import IUser from "../models/user";
import dbModel from "../utils/db.model";
import { useAppDispatch } from "../provider/store";
import { setUser } from "../provider/user/user";
import { FirebaseAuthContext } from "./auth.provider";

export default function useListenUser() {

    const authUser = React.useContext(FirebaseAuthContext)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
    
        let userDisposable: (() => void) | null
      
        if(authUser) {
        
            const uid = authUser.uid
            console.log(uid)
            
            userDisposable = dbModel.users.doc(uid).onSnapshot((userSnapshot) => {
                const user = userSnapshot.data() as IUser
                dispatch(setUser(user))
            })
            
        } else {
            dispatch(setUser(null))
        }
        
        return () => {
            if(userDisposable) {
                userDisposable()
            }
        }
      
    }, [authUser])

}