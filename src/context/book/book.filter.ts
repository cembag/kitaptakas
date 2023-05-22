import { BookCondition, BookLegibility } from "../../models/book"
import { BookType } from "./book.types"

export type FilterFor = typeof filterFor[number]

const filterFor = [
    "title",
    "author"
] as const

export type FilterState = {
    client: {
        for: FilterFor
        type: BookType[],
        condition: BookCondition | "",
        legibility: BookLegibility | "",
        number_of_pages?: {
            min: string,
            max: string
        },
        has_missing_page?: boolean
    }
}