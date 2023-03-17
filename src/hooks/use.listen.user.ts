import { useEffect } from "react"
import firebase from "firebase/app"
import IUser from "../models/user";
import dbModel from "../utils/db.model";
import { useAppDispatch } from "../provider/store";
import { setUser } from "../provider/user/user";

export default function useListenUser() {
    
    const dispatch = useAppDispatch()
    
    useEffect(() => {
    
        let userDisposable: (() => void) | null
      
        if(firebase.auth().currentUser) {
        
            const uid = firebase.auth().currentUser!.uid
            
            console.log(uid)
            
            userDisposable = dbModel.users.doc(uid).onSnapshot((userSnapshot) => {
                const user = userSnapshot.data() as IUser
                console.log("USER UPDATED: ", user)
                dispatch(setUser(user))
            })
        }
        
        return () => {
            if(userDisposable) {
                userDisposable()
            }
        }
      
    }, [firebase.auth().currentUser])

}