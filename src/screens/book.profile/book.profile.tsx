import "./book.profile.scss"
import { useEffect, useState } from "react"
import BookDal from "../../dal/book/book.dal"
import IBook from "../../models/book"
import { useAppDispatch, useTypedSelector } from "../../provider/store"
import DateService from "../../services/date/date.service"
import { FcOvertime } from "react-icons/fc"
import { HiOutlineHeart } from "react-icons/hi"
import FavouriteDal from "../../dal/favourite/favourite.dal"
import { rDb } from "../../config/firebase"
import useListenUserFavourites from "../../hooks/use.listen.user.favourites"
import useListenBookFavourites from "../../hooks/use.listen.book.favourites"
import BookCardA from "../../components/card/book/book.card.a/book.card"
import { setTradeModal } from "../../provider/modals/modals.reducer"
import { GiOpenBook } from "react-icons/gi"
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion"
import dbModel from "../../utils/db.model"
import { useLocation } from "react-router-dom";

export default function BookProfile(): JSX.Element {

    const dispatch = useAppDispatch()
    const favouriteDal = new FavouriteDal()
    const dateService = new DateService()
    const [book, setBook] = useState<IBook | undefined>()
    const [recommendedBooks, setRecommendedBooks] = useState<IBook[]>([])
    const bookDal = new BookDal()
    const { language, globalUser } = useTypedSelector(state => state)
    const bookFavouriteData = useListenBookFavourites(book && book.id)
    const location = useLocation();

    useListenUserFavourites()

    useEffect(() => {

        const path = location.pathname
        const bookId = path.substring((path.indexOf("book/") + 5), path.length)

        bookDal.getBook(bookId).then(book => {
            setBook(book)
            dbModel.books.where("type", "==", book.type).get().then((books) => books.docs.forEach(book => setRecommendedBooks(prev => ([...prev, book.data()]))))
        })

    }, [location.pathname])

    useEffect(() => {
        console.log(bookFavouriteData.count)
    }, [bookFavouriteData.count])

    return (
        <div id="book-page" className="page">

            <section id="book">
                {
                    book ? (
                        <div className="book-container" onClick={async () => {
                            const favourites = (await rDb.ref("users/" + globalUser.user!.id + "/favourites").get()).val()
                            console.log(favourites)
                        }}>
                            <figure>
                                {book.images && book.images.length > 0 && <img className="image" src={book.images[0]} alt="" />}
                                {!book.images || book.images.length === 0 && <img className="image" src={require("../../assets/images/ic_book.png")} alt="" />}
                            </figure>
                            <div className="book">
                                <header>
                                    <h2>{book.title.toUpperCase()}</h2>
                                    <h3>{book.author}</h3>
                                    <div className="row ai-center">
                                        <div className="date attribute">
                                            <FcOvertime className="date-icon icon" />
                                            <span>{dateService.getDayAndMonthFromDate(dateService.getDateFromFirestore(book.created_at), language)}</span>
                                        </div>

                                        <div className="favourites attribute">
                                            <HiOutlineHeart className="heart-icon icon" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                console.log(globalUser.favourites)

                                                if (globalUser && globalUser.favourites.includes(book.id)) {
                                                    favouriteDal.delete(book.id)
                                                } else {
                                                    favouriteDal.add(book.id)
                                                }
                                            }} style={{ color: globalUser && globalUser.favourites.includes(book.id) ? "var(--theme-color)" : "#78909C", fill: globalUser && globalUser.favourites.includes(book.id) ? "var(--theme-color)" : "white" }} />
                                            <span>{bookFavouriteData.count}</span>
                                            <div className="">

                                            </div>
                                        </div>
                                    </div>
                                </header>

                                <div className="attributes-wrapper">
                                    <div className="attributes-container">
                                        <div className="attribute">
                                            <span className="name">Ürün kodu</span>
                                            <span className="value">{book.id.substring(0,6)}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Kategori</span>
                                            <span className="value">{book.type}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Dil</span>
                                            <span className="value">{book.language}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Sayfa sayısı</span>
                                            <span className="value">{book.number_of_pages}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Yayıncı</span>
                                            <span className="value">{book.publisher}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Okunabilirlik</span>
                                            <span className="value">{book.legibility}</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Durum</span>
                                            <span className="value">{book.condition}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space"></div>

                                <div className="buttons">
                                    <button className="trade-button" onClick={() => dispatch(setTradeModal(book.id))}>
                                        Trade
                                    </button>
                                </div>
                            </div>
                            <div className="owner">

                                <header className="container">
                                    <span className="name">Cem Hakkı Bağ</span>
                                    <span className="trades">2000 <b>işlem</b></span>
                                </header>

                                <div className="bio container">
                                    <span>Kitap Gemisi tüm Türkiye'ye Sendeo Kargo & NadirKitap anlaşması ile gönderim yapmaktadır;
                                        Tek kitap kargo ücreti: 24.00 TL(KDV dahil)
                                        2 ve daha fazla kitap:  26.00 TL (Adet limiti olmaksızın, KDV dahil)
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="book-container skeletion">
                            <figure>
                                <div className="image">
                                    <GiOpenBook className="icon" />
                                </div>
                            </figure>
                            <div className="book">
                                <header></header>
                                <div className="attributes-wrapper">
                                    <div className="attributes-container"></div>
                                </div>
                                <div className="space"></div>
                                <div className="buttons"></div>
                            </div>
                            <div className="owner">
                                <header className="container">
                                    <span className="name"></span>
                                    <span className="trades"></span>
                                </header>
                                <div className="bio container">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>

            <section id="recommended">
                <div className="recommended-container">
                    <h2>Recommended for you</h2>
                    <div className="books">
                        {
                            (book && recommendedBooks.length > 0) ? (
                                recommendedBooks.map(book => {
                                    return (
                                        <BookCardA book={book} isFavourite={false}/>
                                    )
                                })
                            ) : (
                                <>
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                    <BookCardASkeletion />
                                </>
                            )
                        }
                    </div>
                </div>
            </section>

        </div>
    )
}


