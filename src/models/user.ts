import { BookType } from "../context/book/book.types"

export default interface IUser {
    id: string
    username: string
    email: string
    password: string
    bio: string
    favourite_types: BookType[]
    age: number
    favourites?: string[]
}