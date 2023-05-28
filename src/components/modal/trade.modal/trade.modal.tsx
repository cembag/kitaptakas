import firebase from "firebase"
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
import dbModel from "../../../utils/db.model"
import ITrade from "../../../models/trade"


export default function TradeModal(): JSX.Element {

    const bookId = useTypedSelector(state => state.modals.trade)
    const bookDal = new BookDal()
    const dispatch = useAppDispatch()

    const [book, setBook] = useState<IBook | null>(null)
    const [userBooks, setUserBooks] = useState<IBook[]>([])

    useEffect(() => {

        setUserBooks([]);

        if (bookId) {
            bookDal.getBook(bookId).then((book) => setBook(book))
            dbModel.userBooks(firebase.auth().currentUser!.uid).get().then(userBooks => userBooks.docs.forEach(userBook => setUserBooks(prev => ([...prev, userBook.data()]))))
            
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
                                        book && userBooks.length > 0 && (
                                          userBooks.map((userBook) => {
                                            return (
                                                <div className="book-card">
                                                    {
                                                        userBook.images && userBook.images.length > 0 ? <img src={userBook.images[0]} alt="" /> : <img src={bookImg}></img>
                                                    }
                                                    <div className="col">
                                                        <h2 className="title">{userBook.title}</h2>
                                                        <h3 className="author">{userBook.author}</h3>
                                                        <div className="space"></div>
                                                        <button onClick={ async () => {

                                                            const trade: ITrade = {
                                                                id: "",
                                                                alan_kisi: book?.shared_by!,
                                                                gonderen_kisi: firebase.auth().currentUser!.uid,
                                                                istenilen_kitap: {
                                                                    id: book.id,
                                                                    title: book.title,
                                                                    author: book.author,
                                                                    img: book.images.length > 0 ? book.images[0] : ""
                                                                },
                                                                teklif_edilen_kitap: {
                                                                    id: userBook.id,
                                                                    title: userBook.title,
                                                                    author: userBook.author,
                                                                    img: userBook.images.length > 0 ? userBook.images[0] : ""
                                                                },
                                                                status: "pending",
                                                                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                                                            }

                                                            await dbModel.trades.add(trade).then(async (tradeDocument) => {
                                                                const tradeId = tradeDocument.id;
                                                                await dbModel.trades.doc(tradeId).update({id: tradeId})
                                                                await dbModel.userTrades(firebase.auth().currentUser!.uid).doc(tradeId).set({...trade, id: tradeId})
                                                                await dbModel.userTrades(book?.shared_by!).doc(tradeId).set({...trade, id: tradeId})
                                                            });

                                                            dispatch(setTradeModal(""));

                                                        }}>Offer</button>
                                                    </div>
                                                </div>
                                            )
                                          })
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