import { useEffect, useState } from "react"
import BookDal from "../../dal/book/book.dal"
import IBook from "../../models/book"
import "./book.profile.scss"

export default function BookProfile(): JSX.Element {

    const [book, setBook] = useState<IBook | undefined>()
    const bookDal = new BookDal()

    useEffect(() => {

        const path = window.location.pathname
        const bookId = path.substring((path.indexOf("book/") + 5), path.length)

        bookDal.getBook(bookId).then(book => setBook(book))

    }, [window.location.pathname])

    return (
        <div className="book page">

            {
                book && (
                    <span>{book.title}</span>
                )
            }

        </div>
    )
}