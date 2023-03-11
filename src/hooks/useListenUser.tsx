import { useEffect } from "react"
import { useAppDispatch } from "../provider/store"
import { setUser } from "../provider/user/user"
import dbModel from "../utils/db.model"

export default function useListenUser() {

    const id = "qL0AeKxdQxmc5cSYnxOw"

    const dispatch = useAppDispatch()

    useEffect(() => {

        const userDisposable = dbModel.users.doc(id).onSnapshot((user) => dispatch(setUser(user.data()!)))

        return userDisposable()
    }, [])

}