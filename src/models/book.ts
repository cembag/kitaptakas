import firebase from "firebase"
import { BookTypes } from "../context/book/book.types"

// export type BookStatus = ""
export type BookCondition = "Good" | "Worn" | "Damaged"
export type BookLegibility = "Legible" | "Hard to read" | "Unreadable"
export type BookLanguage = "Tr" | "En" | "Others"

export default interface IBook {
    id: string
    shared_by: string
    owner?: string
    type: BookTypes
    language: BookLanguage
    title: string
    author: string
    publisher?: string
    number_of_pages: number
    has_missing_page: boolean
    legibility: BookLegibility
    created_at: firebase.firestore.Timestamp
    images?: string[]
    condition: BookCondition
    //status: BookStatus
}