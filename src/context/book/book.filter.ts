import { BookCondition, BookLegibility } from "../../models/book"
import { BookTypes } from "./book.types"

export type FilterFor = typeof localFor[number]

const localFor = [
    "book",
    "author"
] as const

export type FilterState = {
    local: {
        for: FilterFor,
        title: string,
    },
    client: {
        type: BookTypes[],
        condition: BookCondition | "",
        legibility: BookLegibility | "",
        number_of_pages?: {
            min: string,
            max: string
        },
        has_missing_page?: boolean
    }
}