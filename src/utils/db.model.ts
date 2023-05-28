import firebase from "firebase"
import IError from "../models/error"
import IUser from "../models/user"
import IBook from "../models/book"
import ITrade from "../models/trade"
import { db } from "../config/firebase"

const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => Object.assign({id: snap.id}, snap.data()) as T
})

const dataPoint = <T extends firebase.firestore.DocumentData>(collectionPath: string) => db.collection(collectionPath).withConverter(converter<T>())

const dbModel = {
    users: dataPoint<IUser>("users"),
    books: dataPoint<IBook>("books"),
    trades: dataPoint<ITrade>("trades"),
    errors: dataPoint<IError>("errors"),
    userBooks: (userId: string) => dataPoint<IBook>("users/" + userId + "/books"),
    userTrades: (userId: string) => dataPoint<ITrade>("users/" + userId + "/trades"),
}

export default dbModel