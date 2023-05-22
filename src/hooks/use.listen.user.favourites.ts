import { useContext, useEffect } from "react";
import { useAppDispatch } from "../provider/store";
import { addToFavourites, removeFromFavourites, setFavourites } from "../provider/user/user";
import dbModel from "../utils/db.model";
import { FirebaseAuthContext } from "./auth.provider";

export default function useListenUserFavourites() {
    
    const authUser = useContext(FirebaseAuthContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFavourites([]));
        let favouritesDisposable: (() => void) | null = null

        if(authUser) {
            const id = authUser.uid;
            favouritesDisposable = dbModel.users.doc(id).collection("favourites").onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if(change.type === "added") {
                        dispatch(addToFavourites(change.doc.id))
                    } else if (change.type === "removed") {
                        dispatch(removeFromFavourites(change.doc.id))
                    }
                })
            })

        }

        return () => {
            if(favouritesDisposable) {
                favouritesDisposable()
            }
        }

    }, [authUser])
}