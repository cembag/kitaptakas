import firebase from "firebase/app"
import { BookType } from "../context/book/book.types"

export default interface IUser {
    id: string
    username: string
    birth_date: firebase.firestore.Timestamp
    bio: string
    email: string
    password: string
    location: {
        geo_point: {
            latitude: number,
            longitude: number,
        },
        country: string,
        city: string,
        district: string,
    }
    favourite_book_types: BookType[]
    notification_tokens: string[]
}