import firebase from "firebase"
import { BookTypes } from "../context/book/book.types"

// export type BookStatus = ""
export type BookCondition = typeof BookConditions[number]
export type BookLegibility = typeof BookLegibilitys[number]
export type BookLanguage = typeof BookLanguages[number]

export const BookLanguages = [
    "Tr",
    "En",
    "Others"
] as const

export const BookConditions = [
    "Good",
    "Worn",
    "Damaged"
] as const

export const BookLegibilitys = [
    "Legible",
    "Hard to read",
    "Unreadable"
] as const

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