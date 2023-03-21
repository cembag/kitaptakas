export type BookType = typeof bookTypes[number]

export const bookTypes = [
    "Autobiography", 
    "Biography", 
    "Computer", 
    "Culture",
    "Children",
    "Romance",
    "Poem",
    "Essay",
    "Self Improvement",
    "Health",
    "Philosophy",
    "Sports",
    "History",
    "Politics",
    "Lesson",
    "Psychology",
    "Cook",
    "Classics",
    "Science"
] as const

export default BookType