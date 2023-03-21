import { useState } from "react"
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import { CgClose } from "react-icons/cg"
import "./trade.modal.scss"
import { setTradeModal } from "../../../provider/modals/modals.reducer"
import { useEffect } from "react"
import BookDal from "../../../dal/book/book.dal"
import IBook from "../../../models/book"
import bookImg from "../../../assets/images/ic_book.png"
import { TbArrowBigDownLineFilled } from "react-icons/tb"


export default function TradeModal(): JSX.Element {

    const bookId = useTypedSelector(state => state.modals.trade)
    const bookDal = new BookDal()
    const dispatch = useAppDispatch()

    const [book, setBook] = useState<IBook | null>(null)

    useEffect(() => {
        if (bookId) {
            bookDal.getBook(bookId).then((book) => setBook(book))
        }
    }, [bookId])

    return (
        <>
            {
                bookId && (
                    <div className="modal-bg">
                        <div id="trade-modal" className="modal">
                            <div className="modal-container">
                                <header>
                                    <div className="empty"></div>
                                    <h2>Trade</h2>
                                    <div className="close-button" onClick={() => dispatch(setTradeModal(""))}>
                                        <CgClose className="close-icon" />
                                    </div>
                                </header>

                                {
                                    book && (
                                        <div className="book-card">
                                            {
                                                book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                            }
                                            <div className="col">
                                                <h2 className="title">{book.title}</h2>
                                                <h3 className="author">{book.author}</h3>
                                            </div>
                                        </div>
                                    )
                                }

                                <TbArrowBigDownLineFilled className="arrow" />

                                <div className="user-books">

                                    {
                                        book && (
                                            <>
                                                <div className="book-card">
                                                    {
                                                        book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{book.title}</h2>
                                                        <h3 className="author">{book.author}</h3>
                                                        <div className="space"></div>
                                                        <button>Offer</button>
                                                    </div>
                                                </div>
                                                <div className="book-card">
                                                    {
                                                        book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{book.title}</h2>
                                                        <h3 className="author">{book.author}</h3>
                                                        <div className="space"></div>
                                                        <button>Offer</button>
                                                    </div>
                                                </div>
                                                <div className="book-card">
                                                    {
                                                        book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{book.title}</h2>
                                                        <h3 className="author">{book.author}</h3>
                                                        <div className="space"></div>
                                                        <button>Offer</button>
                                                    </div>
                                                </div>
                                                <div className="book-card">
                                                    {
                                                        book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{book.title}</h2>
                                                        <h3 className="author">{book.author}</h3>
                                                        <div className="space"></div>
                                                        <button>Offer</button>
                                                    </div>
                                                </div>
                                                <div className="book-card">
                                                    {
                                                        book.images && book.images.length > 0 ? <img src={book.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{book.title}</h2>
                                                        <h3 className="author">{book.author}</h3>
                                                        <div className="space"></div>
                                                        <button>Offer</button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}