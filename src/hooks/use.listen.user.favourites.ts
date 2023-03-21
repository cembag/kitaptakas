import { useContext, useEffect } from "react";
import { rDb } from "../config/firebase";
import { useAppDispatch } from "../provider/store";
import { addToFavourites, removeFromFavourites, setFavourites } from "../provider/user/user";
import { FirebaseAuthContext } from "./auth.provider";

export default function useListenUserFavourites() {
    
    const authUser = useContext(FirebaseAuthContext)
    const dispatch = useAppDispatch()

    useEffect(() => {

        if(authUser) {

            const uid = authUser.uid

            rDb.ref("users/" + uid + "/favourites").get().then((favouritesSnap) => {
                let favourites: string[] = []
                favouritesSnap.forEach(favourite => {
                    favourites.push(favourite.val())
                })
                dispatch(setFavourites(favourites))

                rDb.ref("users/" + uid + "/favourites").on("child_added", (favourite) => {
                    dispatch(addToFavourites(favourite.val() as string))
                })
                
                rDb.ref("users/" + uid + "/favourites").on("child_removed", (favourite) => {
                    dispatch(removeFromFavourites(favourite.val() as string))
                })
            })
        }

        return () => {
            if(authUser) {
                rDb.ref("users/" + authUser.uid + "/favourites").off("child_added")
                rDb.ref("users/" + authUser.uid + "/favourites").off("child_removed")
            }
        }

    }, [authUser])

}